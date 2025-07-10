import styles from './Footer.module.css';
import github from '../../img/GitHub-Symbol.png';
import instagram from '../../img/instagram.png';
import linkedin from '../../img/linkedin4.png';

function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <a href="https://github.com/DevIsaque" target="_blank" rel="noopener noreferrer">
            <img className={styles.image1} src={github} alt="github" />
          </a>
          <a href="https://www.instagram.com/_zaquee/" target="_blank" rel="noopener noreferrer">
            <img className={styles.image2} src={instagram} alt="instagram" />
          </a>
          <a href="https://www.linkedin.com/in/isaque-matarazzo-808891349/" target="_blank" rel="noopener noreferrer">
            <img className={styles.image3} src={linkedin} alt="linkedin" />
          </a>
        </div>
      </footer>
    );
}

export default Footer;