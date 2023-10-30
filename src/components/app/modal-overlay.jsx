import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
export default function ModalOverlay(props) {
    return (
        <div onClick={props.onClick} className={styles.popup}></div>
    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}
