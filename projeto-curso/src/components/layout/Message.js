
import styles from './Message.module.css';
import {useState, useEffect} from 'react';

function Message ({type, msg, onClose}){
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(!msg){
            setVisible(false);
            return;
        } else {
            setVisible(true);
        }
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [msg, onClose]);

    return (<>
    {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
            {msg}
        </div>
    )}
    </>);
}

export default Message;