import styles from './Home.module.css'
import foguete from '../img/Foguete1.png';
import LinkButton from './layout/LinkButton';




function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Banklyzer</span></h1>
            <p>Decole com seus negócios agora mesmo!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={foguete} alt="Costs" className={styles.logo} />
        </section>
    );
}

export default Home;