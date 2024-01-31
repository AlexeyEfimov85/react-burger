import { FC } from 'react';
import styles from "./main-elements.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ListItem } from '../../types/types';

/* const MainElements: FC = (props: any) => {
  console.log(props)
  const arr = props.data.filter((element: ListItem) => element.type !== "bun");
  const listItems = arr.map((listItem: ListItem) => (
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

/* export default MainElements; */