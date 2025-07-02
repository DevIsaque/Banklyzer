import React from 'react';
import { useLocation } from 'react-router-dom';

function Projects() {
  const location = useLocation();

  return (
    <div>
      <h1>Projetos</h1>
      {location.state && location.state.message && (
        <p>{location.state.message}</p>
      )}
      <p>Página de listagem de projetos</p>
    </div>
  );
}

export default Projects; 