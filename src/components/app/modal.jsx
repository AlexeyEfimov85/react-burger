import PropTypes from 'prop-types';
import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';
export default function Modal(props) {
    const modalRoot = document.getElementById("modals");
    React.useEffect(() => {
        const escFunction = (e) => {
            if (e.key === "Escape") {
                props.onClick()
            }
        }
        document.addEventListener("keydown", escFunction);
        return () => {
            document.removeEventListener("keydown", escFunction);
        };
    }, [])
    return (
        <>
            {createPortal(
                <>
                    <div className={styles.modal}>
                        <span onClick={props.onClick} className={`${styles.modalCloseIcon}`}><CloseIcon type="primary" /></span>
                        {props.children}
                    </div>
                    <ModalOverlay onClick={props.onClick} />
                </>,
                modalRoot
            )}
        </>
    )
}

Modal.propTypes = {
    onClick: PropTypes.func
}