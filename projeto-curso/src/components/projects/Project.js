    
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from './ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../services/ServiceForm';
import { parse, v4 as uuidv4 } from 'uuid';
import ServiceCard from '../services/ServiceCard';


function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services);
        })
        .catch((err) => console.log)
        
    }, [id]);

    function editPost(project) {
        setMessage('');

        // budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto.');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data);
            setShowProjectForm(false);
            setMessage('Projeto atualizado com sucesso!');
            setType('success');
        })
        .catch(err => console.log(err));
    }

    function createService(project) {
        setMessage('');


        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)) {
            setMessage('O custo do serviço não pode ser maior que o orçamento do projeto.');
            setType('error');
            project.services.pop(); 
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then(
            resp => resp.json()
        ).then((data) => {
            setShowServiceForm(false);
        }
        ).catch(err => console.log(err));
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project;

        projectUpdated.services = servicesUpdated;
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost); 

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated);
            setServices(servicesUpdated);
            setMessage('Serviço removido com sucesso!');
        })
        .catch(err => console.log(err));
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    
    if (!project || !project.name) return <p>Projeto não encontrado.</p>;

    return (
        <>
          {project.name ? (
            <div className={styles.project_details}>
                {message && <Message type={type} msg={message} onClose={() => { setMessage(undefined); setType(undefined); }} />}
                <Container customClass="column">
                    {/* Header: Título e botão editar */}
                    <div className={styles.details_container}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                            <h1 style={{ margin: 0 }}>{`Projeto: ${project.name}`}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'} 
                            </button>
                        </div>
                        {/* Informações do projeto */}
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText='Concluir Edição'
                                    projectData={project}
                                />
                            </div>
                        )}
                    </div>
                    {/* Linha divisória */}
                    <hr style={{ margin: '2em 0 1em 0', border: 0, borderTop: '2px solid #e0e0e0' }} />
                    {/* Adicione um serviço + botão na mesma linha */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                        <h2 style={{ margin: 0 }}>Adicione um serviço:</h2>
                        <button onClick={toggleServiceForm} className={styles.buttons_two}>
                            {!showServiceForm ? 'Adicionar' : 'Fechar'} 
                        </button>
                    </div>
                    {/* Formulário de serviço (quando aberto) */}
                    {showServiceForm && (
                        <div className={styles.project_info}>
                            <ServiceForm 
                                handleSubmit={createService}
                                btnText='Adicionar Serviço'
                                projectData={project}
                            />
                        </div>
                    )}
                    {/* Linha divisória colorida logo abaixo do adicionar serviço */}
                    <hr style={{ margin: '2em 0 1em 0', border: 0, borderTop: '2px solid #ffd900' }} />
                    {/* Agora, abaixo, a seção de Serviços */}
                    <div style={{ marginTop: '2em' }}>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                            <div className={styles.services_list}>
                                {services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                                }   
                            </div>
                                
                                
                            }
                            {services.length === 0 && 
                                <p>Não há serviços cadastrados.</p>
                                
                            }
                        </Container>
                    </div>
                </Container>
            </div>
          ): (
            <Loading/>
          )}
        </>
    );
}

export default Project;