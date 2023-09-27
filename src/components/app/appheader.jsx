import styles from './appheader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function NavListItem(props) {
    return (
        <a style={{ justifySelf: 'end' }}><li className={styles.listItem}>{props.icon}{props.text}</li></a>
    )
}

function NavList() {
    return (
        <>
            <NavListItem icon={<BurgerIcon type="primary" />} text={<p className="text text_type_main-default">
                Конструктор
            </p>} />
            <NavListItem icon={<ListIcon type="secondary" />} text={<p className="text text_type_main-default text_color_inactive">
                Лента заказов
            </p>} />
        </>
    )
}

function Nav() {
    return (
        <nav className={styles.nav}>
            <NavList />
        </nav>
    )
}

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper} >
                <Nav />
                <div style={{ justifySelf: 'center' }}>
                    <Logo />
                </div>
                <NavListItem icon={<ProfileIcon type="secondary" />} text={<p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>} />
            </div>
        </header>
    )
}