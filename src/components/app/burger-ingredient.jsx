import styles from './burger-ingredient.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from './modal';
import { IngredientDetails } from './modal';
import { createPortal } from 'react-dom';


function SectionHeading() {
  return (
    <h1 className="text text_type_main-large">Соберите бургер </h1>
  )
}

function Tabs() {
  const [current, setCurrent] = React.useState('one')
  return (
    <div className={styles.tabWrapper}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

function Article(props) {
  return (
    <article className={styles.article}>
      <p className="text text_type_main-medium">
        {props.text}
      </p>
      {props.children}
    </article>
  )
}

Article.propTypes = {
  data: PropTypes.array
}

function ItemList(props) {
  const arr = props.data.filter(element =>
    element.type === props.type);
  const listItems = arr.map(listItem =>
    <li onClick={() => props.onClick(listItem)} className={styles.listItem} key={listItem._id}>
      <img src={listItem.image} alt={listItem.name} />
      <p className="text text_type_digits-default">
        {listItem.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">
        {listItem.name}
      </p>
      {listItem._id === "643d69a5c3f7b9001cfa093c" && <Counter count={1} size="default" extraClass="m-1" />}
    </li>
  );
  return (
    <ul className={styles.list}>{listItems}</ul>
  )
}

ItemList.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string
}
export default function BurgerIngredients({ data }) {
  const modalRoot = document.getElementById("modals");
  const [currentIngredient, setcurrentIngredient] = React.useState(null);
  const closeModal = () => {
    setcurrentIngredient(null)
  }
  const escFunction = (e) => {
    if (e.key === "Escape") {
      setcurrentIngredient(null)
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [])
  return (
    <section className={styles.sectionBurgerIngredients}>
      <SectionHeading />
      <Tabs />
      <div className={`${styles.ingredientsWrapper} custom-scroll`}>
        <Article text={'Булки'}>
          <ItemList data={data} type='bun' onClick={setcurrentIngredient} />
        </Article>
        <Article text={'Соусы'}>
          <ItemList data={data} type='sauce' onClick={setcurrentIngredient} />
        </Article>
        <Article text={'Начинки'}>
          <ItemList data={data} type='main' onClick={setcurrentIngredient} />
        </Article>
      </div>
      {createPortal(
        <>
          {currentIngredient && <Modal  onClick={closeModal}>
            <IngredientDetails name={currentIngredient.name} src={currentIngredient.image} calories={currentIngredient.calories} proteins={currentIngredient.proteins} fat={currentIngredient.fat} carbohydrates={currentIngredient.carbohydrates} />
          </Modal>}
        </>,
        modalRoot
      )}
    </section>

  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array
}