import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { OrderDetails } from "./order-details";
import Modal from "./modal";
import TotalOrder from "./total-order";
import MainElements from "./main-elements";




export default function BurgerConstructor({ data }) {
  const [isOpen, setIsOpen] = React.useState(false);
  //временная функция для открытия модалки
  const openModal = (e) => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <section className={`${styles.burgerConstructor} mt-15`}>
      <div className={styles.burgerConstructorAllElemenstWrapper}>
        <div className="ml-15">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />
        </div>
        <div
          className={`${styles.burgerConstructorMainElementWrapper} custom-scroll pr-1`}
        >
          <MainElements data = {data}
            text={"Соус традиционный галактический"}
            price={15}
            thumbnail={data[6].image}
          />

        </div>
        <div className="ml-15">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={data[0].image}
          />
        </div>
      </div>
      <div className={`${styles.totalWrapper} mt-10 mb-15`}>
        <TotalOrder price={610}></TotalOrder>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClick={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.array
};
