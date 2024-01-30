import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import styles from './tabs.module.css';
import { useSelector as selectorHook, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../..";

const Tabs: FC = () => {
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const current = useSelector(store => store.setCurrentTabReducer.currentTab)
  return (
    <div className={styles.tabWrapper}>
      <Tab value="one" active={current === "one"} >
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} >
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} >
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;