import PropTypes from "prop-types";
import styles from "./total-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export default function TotalOrder(props) {
  return (
    <div className="mr-10">
      <span className="text text_type_digits-medium mr-2">{props.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

TotalOrder.propTypes = {
  price: PropTypes.number,
};
