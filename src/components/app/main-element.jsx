import PropTypes from "prop-types";
import styles from "./main-element.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
export default function MainElement(props) {
  const arr = props.data.filter((element) => element.type === "main");
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

MainElement.propTypes = {
  thumbnail: PropTypes.any,
  text: PropTypes.string,
  price: PropTypes.number,
};
