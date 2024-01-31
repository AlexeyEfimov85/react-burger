import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TotalOrderProps = {
  price: number;
}

const TotalOrder = (props: TotalOrderProps) => {
  return (
    <div className="mr-10">
      <span className="text text_type_digits-medium mr-2">{props.price}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

export default TotalOrder;

