import styles from "./app.module.css";
import Header from "./app-header";
import BurgerIngredients from "./burger-ingredient";
import BurgerConstructor from "./burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  return (
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients></BurgerIngredients>
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
  );
}

export default App;
