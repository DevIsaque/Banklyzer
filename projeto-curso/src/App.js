import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Contato from './components/Contato';
import Company from './components/Company';
import NewProject from './components/NewProject';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Projects from './components/projects/Projects';
import Project from './components/projects/Project';



function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
