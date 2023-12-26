import { Link } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function NavList() {
  return (
    <>
      <NavLink
        to="/"
        className={`${styles.listItemLink} text text_type_main-default text_color_inactive`}
        style={({ isActive }) => {
          return {
            color: isActive ? "white" : "",
          };
        }}
      >
        {({ isActive }) => (
          <li className={styles.listItem}>
            <BurgerIcon type={isActive ? "primary" : "secondary"} />
            <p>Конструктор</p>
          </li>
        )}
      </NavLink>
      <NavLink
        to="/feed"
        className={`${styles.listItemLink} text text_type_main-default text_color_inactive`}
        style={({ isActive }) => {
          return {
            color: isActive ? "white" : "",
          };
        }}
      >
        {({ isActive }) => (
        <li className={styles.listItem}>
          <ListIcon type={isActive ? "primary" : "secondary"} />
          <p>Лента заказов</p>
          </li>
           )}
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
        <Link to="/">
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <Logo />
            </div>
          </div>
        </Link>
        <NavLink
          to="/profile"
          className={`${styles.listItemLink} text text_type_main-default text_color_inactive`}
          style={({ isActive }) => {
            return {
              color: isActive ? "white" : "",
            };
          }}
          state={{ from: "/profile" }}
        >
          {({ isActive }) => (
        <li className={styles.listItem}>
          <ProfileIcon type={isActive ? "primary" : "secondary"} />
          <p>Личный кабинет</p>
          </li>
           )}
        </NavLink>
      </div>
    </header>
  );
}
