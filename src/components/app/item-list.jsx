import PropTypes from "prop-types";
import styles from './item-list.module.css';
import {
    CurrencyIcon,
    Counter,
  } from "@ya.praktikum/react-developer-burger-ui-components";
export default function ItemList(props) {
    const arr = props.data.filter((element) => element.type === props.type);
    const listItems = arr.map((listItem) => (
      <li
        onClick={() => props.onClick(listItem)}
        className={styles.listItem}
        key={listItem._id}
      >
        <img src={listItem.image} alt={listItem.name} />
        <p className="text text_type_digits-default">
          {listItem.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{listItem.name}</p>
        {listItem._id === "643d69a5c3f7b9001cfa093c" && (
          <Counter count={1} size="default" extraClass="m-1" />
        )}
      </li>
    ));
    return <ul className={styles.list}>{listItems}</ul>;
  }
  
  ItemList.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string,
  };