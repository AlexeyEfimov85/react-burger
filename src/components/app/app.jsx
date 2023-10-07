import styles from "./app.module.css";
import Header from "./app-header";
import BurgerIngredients from "./burger-ingredient";
import BurgerConstructor from "./burger-constructor";
import React from "react";



function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    data: []
  })
  React.useEffect(() => {
    const getIngredients = () => {
      setState({ ...state, isLoading: true });
      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((res) => {
          return res.json();
        })
        .then((object) => {
          setState({ data: object.data, isLoading: false })
        })
    }
    getIngredients();
  }, [])
  return (
    <>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          {!state.isLoading && state.data.length &&
            <BurgerIngredients data={state.data} />}
          {!state.isLoading && state.data.length &&
            <BurgerConstructor data={state.data} />}
        </main>
      </div>
    </>
  );
}

export default App;



