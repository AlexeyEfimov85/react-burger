import React from 'react';
import PropTypes from "prop-types";
import styles from "./main-elements.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function MainElements(props) { 
  const arr = props.data.filter((element) => element.type !== "bun");
  const listItems = arr.map((listItem) => (
    <div className={styles.burgerConstructorMainElement} key={listItem._id}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={listItem.name}
        price={listItem.price}
        thumbnail={listItem.image}
      />
  </div>
  ));
  return <ul className={styles.list}>{listItems}</ul>;
}

MainElements.propTypes = {
  data: PropTypes.array.isRequired
};
