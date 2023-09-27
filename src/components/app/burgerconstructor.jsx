import React from 'react';
import styles from './burgerconstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function TotalOrder(props) {
    return (
        <div className="mr-10" >
            <span className='text text_type_digits-medium mr-2'>{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
    )
}

function BulkaElement(props) {
    return (
        <div className='ml-13'>
            <ConstructorElement
                    type={props.type}
                    isLocked={true}
                    text={props.text}
                    price={props.price}
                    thumbnail={props.thumbnail}
                />
        </div>
    )
}

function MainElement(props) {
    return(
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <DragIcon type="primary" />
            <ConstructorElement text = {props.text} price = {props.price} thumbnail = {props.thumbnail} />
        </div>
    )
}

export default function BurgerConstructor(props) {
    return (

        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '600px' }} className='mt-15 mb-13'>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <div style = {{marginLeft: '52px'}}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={props.data[0].image}
                />
                </div>
                <div style={{ maxHeight: '50vh', overflowY: 'scroll', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%'  }} className='custom-scroll pr-1'>
                    <MainElement text = {"Соус традиционный галактический"} price = {15} thumbnail = {props.data[6].image}/>
                    <MainElement text = {"Мясо бессмертных моллюсков Protostomia"} price = {1337} thumbnail = {props.data[5].image}/>
                    <MainElement text = {"Плоды Фалленианского дерева"} price = {874} thumbnail = {props.data[7].image}/>
                    <MainElement text = {"Хрустящие минеральные кольца"} price = {50} thumbnail = {props.data[8].image}/>
                    <MainElement text = {"Хрустящие минеральные кольца"} price = {50} thumbnail = {props.data[8].image}/>
                </div>
                <div style = {{marginLeft: '52px'}}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={props.data[0].image}
                /></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '52px' }}
                className="mt-10">
                <TotalOrder price={610} ></TotalOrder>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}