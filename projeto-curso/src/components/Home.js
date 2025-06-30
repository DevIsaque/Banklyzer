import styles from './Home.module.css'
import porquinho from '../img/Porquinho.png';
import LinkButton from './layout/LinkButton';




function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Banklyzer</span></h1>
            <p>Comece a gerenciar os seus negócios agora mesmo</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={porquinho} alt="Costs" className={styles.logo} />
        </section>
    );
}

export default Home;