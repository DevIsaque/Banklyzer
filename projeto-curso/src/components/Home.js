import styles from './Home.module.css'
import foguete from '../img/Foguete1.png';
import LinkButton from './layout/LinkButton';
import { useState, useEffect } from 'react';

function Home() {
    const [count, setCount] = useState(0);
    const target = 150;
    const duration = 1500;

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16);
        const animate = () => {
            start += increment;
            if (start < target) {
                setCount(Math.floor(start));
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };
        animate();
    }, []);

    return (
        <section className={styles.home_container}>
            {/* Título centralizado */}
            <h1>Bem-vindo ao <span>Banklyzer</span></h1>
            <p>Decole com seus negócios agora mesmo!</p>

            {/* Seção de marketing */}
            <div className={styles.marketing_section}>
                {/* Primeira linha: texto à esquerda, foguete à direita */}
                <div className={styles.marketing_row}>
                    <div className={styles.marketing_text_left}>
                        <h2>O <span className={styles.gradient}>Banklyzer</span> é a solução ideal para gerenciar projetos e finanças de forma simples, visual e eficiente.</h2>
                        <p>Tenha controle total dos seus orçamentos, acompanhe o progresso dos seus serviços e tome decisões inteligentes para o seu negócio crescer!</p>
                        <div className={styles.cta_row}>
                            <LinkButton to="/newproject" text="Criar Projeto" />
                            <span className={styles.counter_phrase}>+{count} projetos criados</span>
                        </div>
                    </div>
                    <div className={styles.marketing_img_right}>
                        <img src={foguete} alt="Foguete Banklyzer" className={styles.foguete_img} />
                        <div className={styles.marketing_text_below_img}>
                            <h2>Pronto para decolar?</h2>
                            <p>Crie seu projeto agora mesmo e veja como o Banklyzer pode transformar sua gestão financeira!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;