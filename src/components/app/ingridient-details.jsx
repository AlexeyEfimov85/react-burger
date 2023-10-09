import PropTypes from 'prop-types';
import styles from './ingridient-details.module.css';
export function IngredientDetails(props) {
    return (
        <div className={styles.ingredientDetails}>
            <p className={`${styles.modalHeading} text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
            <img src={props.src} alt={props.src} className={styles.ingredientDetailsPicture}></img>
            <p className="text text_type_main-medium mt-4">{props.name}</p>
            <div className={`${styles.ingredientParameters} text text_type_main-default text_color_inactive`}>
                <p className={styles.ingredientParameter}>
                    <span>Калории,ккал</span>
                    <span>{props.calories}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Белки,&nbsp;г</span>
                    <span>{props.proteins}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Жиры,&nbsp;г</span>
                    <span>{props.fat}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Углеводы,&nbsp;г</span>
                    <span>{props.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    src: PropTypes.any,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}