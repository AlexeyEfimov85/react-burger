import styles from "./app.module.css";
import BurgerIngredients from "../../components/app/burger-ingredient";
import BurgerConstructor from "../../components/app/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Main() {
  return (
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients></BurgerIngredients>
          <BurgerConstructor />
        </DndProvider>
      </main>
  );
}
