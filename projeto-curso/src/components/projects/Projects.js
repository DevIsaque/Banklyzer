import React from 'react';
import { useLocation } from 'react-router-dom';
import Message from '../layout/Message';
import styles from './Projects.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProjectCard from './ProjectCard';
import Loading from '../layout/Loading';
import { useState, useEffect } from 'react';

function Projects() {

  const[projects, setProjects] = useState([])
  const[removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation();
  let message = ''

  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(resp => resp.json()) // transforma a resposta em json //
    .then(data => {
      console.log(data)
      setProjects(data)
      setRemoveLoading(true)  // quando a requisição for concluída, remove o carregamento //
    })
    .catch(err => console.log(err))
    }, 300
    )
  }, [])

  function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`, { // deleta o projeto pelo id //
      method: 'DELETE', // deleta o projeto
      headers: {
        'Content-Type' : 'application/json'
      },
    }).then(resp => resp.json()) // transforma a resposta em json //
    .then(() => {
      setProjects(projects.filter((project) => project.id !== id)) // remove o projeto da lista //
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err)) // não precisa de resposta, apenas deleta o projeto //
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_row}>
        <div className={styles.tittle_container}>
          <h1>Meus Projetos</h1>
          {message && <Message type="sucess" msg={message} className={styles.message} />}
          {projectMessage && <Message type="sucess" msg={projectMessage} className={styles.message} />}
        </div>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      <Container customClass="start minHeightContainer">
        {projects.length > 0 &&
          projects
            .filter(project => project.name && project.category)
            .map((project) => (
              <ProjectCard 
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category?.name || 'Sem categoria'}
                key={project.id}
                handleRemove={removeProject}
              />
            ))
        }
      </Container>
      {!removeLoading && <Loading/>}
      {removeLoading && projects.length === 0 && (
        <p>Não há projetos cadastrados</p>
      )}
    </div>
  );
}

export default Projects; 