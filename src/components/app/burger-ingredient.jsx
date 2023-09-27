import styles from './burger-ingredient.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';


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

function Item(props) {
  
  const arr = props.data.filter(element =>
    element.type === props.type);
  const listItems = arr.map(listitem =>
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
    
    <ul className={styles.list}>{listItems}</ul>

  )
}

Item.propTypes = {
  data: PropTypes.array
}
export default function BurgerIngredients({ data }) {
  return (

    <section className={styles.sectionBurgerIngredients}>
      <SectionHeading />
      <Tabs />
      <div className={`${styles.ingredientsWrapper} custom-scroll`}>
        <Article text={'Булки'}>
          <Item data={data} type='bun' />
        </Article>
        <Article text={'Соусы'}>
        <Item data={data} type='sauce' />
        </Article>
        <Article text={'Начинки'}>
        <Item data={data} type='main' />
        </Article>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array
}