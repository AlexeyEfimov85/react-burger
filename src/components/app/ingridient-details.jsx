import PropTypes from 'prop-types';
import styles from './ingridient-details.module.css';
import { useSelector } from 'react-redux';
export function IngredientDetails() {
    const currentIngredient = useSelector(store => store.setIngredientDetailsReducer.ingredient); 
    return (
        <div className={styles.ingredientDetails}>
            <p className={`${styles.modalHeading} text text_type_main-large ml-10 mt-10`}>Детали ингридиента</p>
            <img src={currentIngredient.image} alt={currentIngredient.image} className={styles.ingredientDetailsPicture}></img>
            <p className="text text_type_main-medium mt-4">{currentIngredient.name}</p>
            <div className={`${styles.ingredientParameters} text text_type_main-default text_color_inactive`}>
                <p className={styles.ingredientParameter}>
                    <span>Калории,ккал</span>
                    <span>{currentIngredient.calories}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Белки,&nbsp;г</span>
                    <span>{currentIngredient.proteins}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Жиры,&nbsp;г</span>
                    <span>{currentIngredient.fat}</span>
                </p>
                <p className={styles.ingredientParameter}>
                    <span>Углеводы,&nbsp;г</span>
                    <span>{currentIngredient.carbohydrates}</span>
                </p>
            </div>
        </div>
    )
}

