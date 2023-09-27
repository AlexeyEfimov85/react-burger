import styles from './burgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { element } from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';

function SectionHeading() {
  return (
    <h1 className="text text_type_main-large">Соберите бургер </h1>
  )
}

function Tabs() {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }} className='mb-10'>
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

function Item(props) {

  const bulka = props.data.filter(element =>
    element.type === 'bun');
  const listitems = bulka.map(listitem =>
    <li className={styles.listItem} key={listitem._id}>
      <img src={listitem.image} alt={listitem.name} />
      <p className="text text_type_digits-default">
        {listitem.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">
        {listitem.name}
      </p>
      {listitem._id === "60666c42cc7b410027a1a9b1" && <Counter count={1} size="default" extraClass="m-1" />}
    </li>
  );
  return (
    <ul className={styles.list}>{listitems}</ul>

  )
}

Item.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

function ItemSauce(props) {
  const Sauce = props.data.filter(element =>
    element.type === 'sauce');
  const listitems = Sauce.map(listitem =>
    <li className={styles.listItem} key={listitem._id}>
      <img src={listitem.image} alt={listitem.name} />
      <p className="text text_type_digits-default">
        {listitem.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">
        {listitem.name}
      </p>
    </li>
  );
  return (
    <ul className={styles.list}>{listitems}</ul>
  )
}

ItemSauce.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

function ItemMain(props) {
  const Main = props.data.filter(element =>
    element.type === 'main');
  const listitems = Main.map(listitem =>
    <li className={styles.listItem} key={listitem._id}>
      <img src={listitem.image} alt={listitem.name} />
      <p className="text text_type_digits-default">
        {listitem.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">
        {listitem.name}
      </p>
    </li>
  );
  return (
    <ul className={styles.list}>{listitems}</ul>
  )
}

ItemMain.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number
}

export default function BurgerIngredients({ data }) {
  return (

    <section className={styles.sectionBurgerIngredients}>
      <SectionHeading />
      <Tabs />
      <div style={{ maxHeight: '80vh', overflowY: 'scroll' }} className='custom-scroll'>
        <Article text={'Булки'}>
          <Item data={data} />
        </Article>
        <Article text={'Соусы'}>
          <ItemSauce data={data} />
        </Article>
        <Article text={'Начинки'}>
          <ItemMain data={data} />
        </Article>
      </div>
    </section>
  )
}

