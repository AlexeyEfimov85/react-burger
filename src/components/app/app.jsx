import styles from "./app.module.css";
import { data } from "../../utils/data";
import Header from "./app-header";
import BurgerIngredients from "./burger-ingredient";
import BurgerConstructor from "./burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
