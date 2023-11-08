import { combineReducers } from 'redux';
import { getIngredientsReducer } from './burger-ingredient';
import { addIngridientReducer } from './burger-constructor';
import { setIngredientDetailsReducer } from './ingredient-details';
import { setIsOpenReducer } from './modal';
import { getOrderDetailsReducer } from './order-details';
import { setCurrentTabReducer } from './tab';
import { remainDraggedIngredient } from './remain-dragged-ingredient';
import { setIngredientCounterReducer } from './ingredient-counter';

export const rootReducer = combineReducers({
    getIngredientsReducer,
    addIngridientReducer,
    setIngredientDetailsReducer,
    setIsOpenReducer,
    getOrderDetailsReducer,
    setCurrentTabReducer,
    remainDraggedIngredient,
    setIngredientCounterReducer
})