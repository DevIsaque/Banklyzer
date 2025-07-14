import styles from './ProjectCard.module.css';
import {BsPencil, BsFillTrashFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';

function ProjectCard({id, name, budget, category, handleRemove}){
    const remove = (e) => {
        e.preventDefault(); // Prevent default form submission behavior //
        handleRemove(id); // Call the handleRemove function with the project ID //
    }

    return(
        <div className={styles.cardGradient}>
          <div className={styles.projectCard}>
            <div className={styles.titleBar}>{name}</div>
            <p><span>Orçamento:</span> R${budget}</p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to="/">
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}> 
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
          </div>
        </div>
    )
}

export default ProjectCard;