import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
function NavListItem(props) {
  return (
    <li className={styles.listItem}>
      {props.icon}
      {props.text}
    </li>
  );
}

NavListItem.propTypes = {
  children: PropTypes.any,
};

function NavList() {
  return (
    <>
      <NavLink to="/" className= {`${styles.listItemLink} text text_type_main-default text_color_inactive`} style={({ isActive }) => {
              return {
                color: isActive ? "white" : "",
              };
            }}>
        <NavListItem
          icon={<BurgerIcon type="primary" />}
          text={<p>Конструктор</p>}
        />
      </NavLink>
      <NavLink to="/" className= {`${styles.listItemLink} text text_type_main-default text_color_inactive`} style={({ isActive }) => {
              return {
                color: isActive ? "white" : "",
              };
            }}>
        <NavListItem
          icon={<ListIcon type="secondary" />}
          text={
            <p>
              Лента заказов
            </p>
          }
        />
      </NavLink>
    </>
  );
}

function Nav() {
  return (
    <nav className={styles.nav}>
      <NavList />
    </nav>
  );
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Nav />
        <Link to='/'>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        </Link>
        <NavLink to="/profile" className= {`${styles.listItemLink} text text_type_main-default text_color_inactive`} style={({ isActive }) => {
              return {
                color: isActive ? "white" : "",
              };
            }}
            state={{ from: "/profile" }}>
          <NavListItem
            icon={<ProfileIcon type="secondary" />}
            text={
              <p>
                Личный кабинет
              </p>
            }
          />
        </NavLink>
      </div>
    </header>
  );
}
