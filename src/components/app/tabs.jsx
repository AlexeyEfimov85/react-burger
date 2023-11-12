import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from 'react';
import styles from './tabs.module.css';
import { useSelector } from "react-redux";

export default function Tabs() {
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
