import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const TotalOrder = (props: any) => {
  return (
    <div className="mr-10">
      <span className="text text_type_digits-medium mr-2">{props.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

export default TotalOrder;

