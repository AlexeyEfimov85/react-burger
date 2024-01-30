import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';

const Modal = (props: any) => {
    const modalRoot: any = document.getElementById("modals");
    React.useEffect(() => {
        const escFunction = (e: any) : void => {
            if (e.key === "Escape") {
                props.onClose()
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
                        <span onClick={props.onClose} className={`${styles.modalCloseIcon}`}><CloseIcon type="primary" /></span>
                        {props.children}
                    </div>
                    <ModalOverlay onClick={props.onClose} />
                </>,
                modalRoot
            )}
        </>
    )
}

export default Modal;