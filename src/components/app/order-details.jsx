import styles from './order-details.module.css'
import PropTypes from 'prop-types'; 
export function OrderDetails() {
    return (
        <div className={styles.orderDetails}>
            <span className='mt-30 mb-8 text text_type_digits-large'>034536</span>
            <span className='mb-15 text text_type_main-medium'>идентификатор заказа</span>
            <div className={styles.done}></div>
            <span className='mt-15 mb-2 text text_type_main-small'>Ваш заказ начали готовить</span>
            <span className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}