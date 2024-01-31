import styles from "./item-list.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../types/hooks";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import { ListItem, Ingredient } from "../../types/types";

type Props = {
  type: string;
}
const ItemList = (props: Props) => {
  const data = useSelector((store) => store.getIngredientsReducer.ingredients);
  const arr = data.filter((element: ListItem) => element.type === props.type);
  return (
    <ul className={styles.list}>
      {arr.map((listItem: Ingredient) => (
        <Item listItem={listItem} key={listItem._id} />
      ))}
    </ul>
  );
}

type ItemProps = {
  listItem: Ingredient
}

const Item = ({ listItem }: ItemProps) => {
  const location = useLocation();
  const ingredientId = listItem['_id'];
  const count = useSelector(store => store.setIngredientCounterReducer.cart).map((item: ListItem) => {
    return item._id
  }).reduce(function (acc: any, el: any) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
  let counter = 0;
  let idInCart;
  for (let id in count) {
    if (id === listItem._id) {
      counter = count[id]
      idInCart = id;
    }
  }

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: listItem,
  });
  return (
    <Link
      key={ingredientId}
      // Тут мы формируем динамический путь для нашего ингредиента
      to={`/ingredients/${ingredientId}`}
      // а также сохраняем в свойство background роут,
      // на котором была открыта наша модалка
      state={{ background: location }}
      className={styles.link}
    >
      <li
        ref={dragRef}
        className={styles.listItem}
        key={listItem._id}
      >
        <img src={listItem.image} alt={listItem.name} />
        <p className="text text_type_digits-default">
          {listItem.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{listItem.name}</p>
        {listItem._id === idInCart && (
          <Counter count={counter} size="default" extraClass="m-1" />
        )}
      </li>
    </Link>
  );
}

export default ItemList;