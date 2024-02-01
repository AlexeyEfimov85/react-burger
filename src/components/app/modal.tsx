import React, { ReactNode } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';

type ModalProps = {
    onClose: () => void;
    children: ReactNode;
}

const Modal = (props: ModalProps) => {
    const modalRoot: HTMLElement | null  = document.getElementById("modals");
    React.useEffect(() => {
        const escFunction = (e: { key: string; }) : void => {
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
           {modalRoot !== null && createPortal (
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