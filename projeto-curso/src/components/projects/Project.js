    
import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from './ProjectForm';
import Message from '../layout/Message';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

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
        })
        .catch((err) => console.log)
        
    }, [id]);

    function editPost(project) {
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

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    
    if (!project || !project.name) return <p>Projeto não encontrado.</p>;

    return (
        <>
          {project.name ? (
            <div className={styles.project_details}>
                {message && <Message type={type} msg={message} onClose={() => { setMessage(undefined); setType(undefined); }} />}
                <Container customClass="column">
                    <div className={styles.details_container}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                            <h1 style={{ margin: 0 }}>{`Projeto: ${project.name}`}</h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'} 
                            </button>
                        </div>
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
                                <p>
                                    <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText='Concluir Edição'
                                        projectData={project}
                                    />
                                </p>
                            </div>
                        )}
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