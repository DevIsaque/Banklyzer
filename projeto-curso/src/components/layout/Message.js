import styles from './Message.module.css';
import {useState, useEffect} from 'react';

function Message ({type, msg}){

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if(!msg){                    // condicional que verifica se há mensagem
            setVisible(false);
            return
        }else{
            setVisible(true);
        }

        const timer = setTimeout(() => {   // eliminar mensagem depois de 3 segundos
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer); // limpar o timer quando componente for removido

    }, [msg]);

    return (<>
    {visible && (
        <div className={`${`styles.message`} ${styles[type]}`}>
            {msg}
        </div>
    )}
    </>)
}

export default Message;