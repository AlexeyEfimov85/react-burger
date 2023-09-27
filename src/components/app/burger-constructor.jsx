import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
function TotalOrder(props) {
    return (
        <div className="mr-10" >
            <span className='text text_type_digits-medium mr-2'>{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
    )
}

TotalOrder.propTypes = {
    data: PropTypes.array
}

function MainElement(props) {
    return (
        <div className={styles.burgerConstructorMainElement}>
            <DragIcon type="primary" />
            <ConstructorElement text={props.text} price={props.price} thumbnail={props.thumbnail} />
        </div>
    )
}

MainElement.propTypes = {
    data: PropTypes.array
}

export default function BurgerConstructor(props) {
    return (

        <section  className={`${styles.burgerConstructor} mt-15`}>

            <div className={styles.burgerConstructorAllElemenstWrapper}>
                <div className='ml-15'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={props.data[0].image}
                    />
                </div>
                <div  className={`${styles.burgerConstructorMainElementWrapper} custom-scroll pr-1`}>
                    <MainElement text={"Соус традиционный галактический"} price={15} thumbnail={props.data[6].image} />
                    <MainElement text={"Мясо бессмертных моллюсков Protostomia"} price={1337} thumbnail={props.data[5].image} />
                    <MainElement text={"Плоды Фалленианского дерева"} price={874} thumbnail={props.data[7].image} />
                    <MainElement text={"Хрустящие минеральные кольца"} price={50} thumbnail={props.data[8].image} />
                    <MainElement text={"Хрустящие минеральные кольца"} price={50} thumbnail={props.data[8].image} />
                </div>
                <div className='ml-15'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={props.data[0].image}
                    /></div>
            </div>
            <div className={`${styles.totalWrapper} mt-10 mb-15`}>
                <TotalOrder price={610} ></TotalOrder>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.array
  }