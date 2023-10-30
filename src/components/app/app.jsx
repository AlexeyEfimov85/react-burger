import styles from "./app.module.css";
import Header from "./app-header";
import BurgerIngredients from "./burger-ingredient";
import BurgerConstructor from "./burger-constructor";
import Modal from "./modal";
import { IngredientDetails } from "./ingridient-details";
import React from "react";
import { DataContext } from "../../services/appContext";
import { IngredientContext } from "../../services/burgerIngredientContext";
import { baseUrl, checkResponse } from "../../utils/burger-api";
function App() {
  const [currentIngredient, setcurrentIngredient] = React.useState(null);
  const closeModal = () => {
    setcurrentIngredient(null);
  };
  const [state, setState] = React.useState({
    isLoading: false,
    data: [],
  });
  React.useEffect(() => {
    const getIngredients = () => {
      setState({ ...state, isLoading: true });
      fetch( `${baseUrl + '/ingredients'}`)
        .then(checkResponse)
        .then((object) => {
          setState({ data: object.data, isLoading: false });
        })
        .catch((err) => console.log(err));
    };
    getIngredients();
  }, []);
  return (
    <>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          {!state.isLoading && state.data.length && (
            <DataContext.Provider value={{ state }}>
              <IngredientContext.Provider value={{ currentIngredient }}>
                <BurgerIngredients
                  onClick={setcurrentIngredient}
                  currentIngredient={currentIngredient}
                >
                  <>
                  {currentIngredient && (
                    <Modal onClick={closeModal}>
                      <IngredientDetails ingredient={currentIngredient} />
                    </Modal>
                  )}
                  </>
                </BurgerIngredients>
                <BurgerConstructor />
              </IngredientContext.Provider>
            </DataContext.Provider>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
