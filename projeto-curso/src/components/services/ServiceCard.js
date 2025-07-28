import styles from './ServiceCard.module.css';
import {BsFillTrashFill} from 'react-icons/bs';

function ServiceCard({id, name, cost, description, handleRemove}) {

    const remove = (e) => {
        e.preventDefault(); 
        handleRemove(id, cost); 
    }
    return(
        <div className={styles.cardGradient}>
            <h3 className={styles.titleBar}>{name}</h3>
            <p><span>Custo total:</span> R${cost}</p>
            <p>{description}</p>
            <div className ={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;