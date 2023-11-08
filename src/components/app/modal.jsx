import PropTypes from 'prop-types';
import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from './modal-overlay';
import { useDispatch } from 'react-redux';
export default function Modal(props) {
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({type: 'DELETE_INGREDIENT_DETAILS'})
        dispatch({type: 'SET_CLOSE'})
    }
    const modalRoot = document.getElementById("modals");
    React.useEffect(() => {
        const escFunction = (e) => {
            if (e.key === "Escape") {
                closeModal()
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
                        <span onClick={closeModal} className={`${styles.modalCloseIcon}`}><CloseIcon type="primary" /></span>
                        {props.children}
                    </div>
                    <ModalOverlay onClick={closeModal} />
                </>,
                modalRoot
            )}
        </>
    )
}

Modal.propTypes = {
    children: PropTypes.any.isRequired
}