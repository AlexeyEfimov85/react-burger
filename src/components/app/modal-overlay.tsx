import styles from './modal-overlay.module.css';
const ModalOverlay = (props: any) => {
    return (
        <div onClick={props.onClick} className={styles.popup}></div>
    )
}

export default ModalOverlay;