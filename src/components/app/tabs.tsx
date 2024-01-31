import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';
import styles from './tabs.module.css';

import { useSelector } from "../../types/hooks";

const Tabs: FC = () => {
  const current = useSelector(store => store.setCurrentTabReducer.currentTab)
  return (
    <div className={styles.tabWrapper}>
      <Tab value="one" active={current === "one"} onClick={() => {}}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={() => {}}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={() => {}}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;