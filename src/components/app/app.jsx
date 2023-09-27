import styles from "./app.module.css";
import { data } from "../../utils/data";
import  Header  from "./appheader";
import BurgerIngredients from "./burgerIngredients";
import BurgerConstructor from "./burgerconstructor";

function App() {
  return (
    <div className={styles.app}>
      
      	<Header/>
        <main className={styles.main}>
        <BurgerIngredients data = {data}>
        </BurgerIngredients >
        <BurgerConstructor data = {data} />
        </main>
        
    </div>
  );
}

export default App;
