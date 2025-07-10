import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../img/astronauta.footer.png';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src={logo} alt="Costs" className={styles.logo} />
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)} end>Home</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? styles.active : undefined)}>Projetos</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/company" className={({ isActive }) => (isActive ? styles.active : undefined)}>Empresa</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/contato" className={({ isActive }) => (isActive ? styles.active : undefined)}>Contato</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 