import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { OrderDetails } from './modal';
import { createPortal } from 'react-dom';
import Modal from './modal';
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

export default function BurgerConstructor({ data }) {
    const modalRoot = document.getElementById("modals");
    const [total, setTotal] = React.useState(false);
    const escFunction = (e) => {
        if (e.key === "Escape") {
            setTotal(false)
        }
      };
      React.useEffect(() => {
        document.addEventListener("keydown", escFunction);
        return () => {
          document.removeEventListener("keydown", escFunction);
        };
      }, [])
    //временная функция для открытия модалки
    const OpenModal = (e) => {
        setTotal(true)
    }
    const closeModal = () => {
        setTotal(false)
      }
    return (

        <section  className={`${styles.burgerConstructor} mt-15`}>

            <div className={styles.burgerConstructorAllElemenstWrapper}>
                <div className='ml-15'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                </div>
                <div  className={`${styles.burgerConstructorMainElementWrapper} custom-scroll pr-1`}>
                    <MainElement text={"Соус традиционный галактический"} price={15} thumbnail={data[6].image} />
                    <MainElement text={"Мясо бессмертных моллюсков Protostomia"} price={1337} thumbnail={data[5].image} />
                    <MainElement text={"Плоды Фалленианского дерева"} price={874} thumbnail={data[7].image} />
                    <MainElement text={"Хрустящие минеральные кольца"} price={50} thumbnail={data[8].image} />
                    <MainElement text={"Хрустящие минеральные кольца"} price={50} thumbnail={data[8].image} />
                </div>
                <div className='ml-15'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={data[0].image}
                    /></div>
            </div>
            <div className={`${styles.totalWrapper} mt-10 mb-15`}>
                <TotalOrder  price={610} ></TotalOrder>
                <Button onClick={OpenModal} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
            {createPortal(
        <>
          {total && <Modal  onClick={closeModal}>
            <OrderDetails />
          </Modal>}
        </>,
        modalRoot
      )}
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.array
  }