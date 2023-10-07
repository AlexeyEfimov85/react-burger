import PropTypes from 'prop-types';
import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';



function ModalOverlay(props) {
    return (
        <div onClick={props.onClick} className={styles.popup}></div>
    )
}
ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export function OrderDetails() {
    return (
        <div className={styles.orderDetails}>
            <span className='mt-30 mb-8 text text_type_digits-large'>034536</span>
            <span className='mb-15 text text_type_main-medium'>идентификатор заказа</span>
            <div className={styles.done}></div>
            <span className='mt-15 mb-2 text text_type_main-small'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}

export function IngredientDetails(props) {
    return (
        <div className={styles.ingredientDetails}>
            <p className={`${styles.modalHeading} text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
            <img src={props.src} alt={props.src} className={styles.ingredientDetailsPicture}></img>
            <p className="text text_type_main-medium mt-4">{props.name}</p>
            <div className={`${styles.ingredientParameters} text text_type_main-default text_color_inactive`}>
                <p className={styles.ingredientParameter}>
                    <span>Калории,ккал</span>
                    <span>{props.calories}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Белки,&nbsp;г</span>
                    <span>{props.proteins}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Жиры,&nbsp;г</span>
                    <span>{props.fat}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Углеводы,&nbsp;г</span>
                    <span>{props.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

ModalOverlay.propTypes = {
    src: PropTypes.any,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}

export default function Modal(props) {
    return (
        <>
            <div className={styles.modal}>
                <span onClick={props.onClick} className={`${styles.modalCloseIcon}`}><CloseIcon type="primary" /></span>
                {props.children}
            </div>
            <ModalOverlay onClick={props.onClick} />
        </>
    )
}

Modal.propTypes = {
    onClick: PropTypes.func
}