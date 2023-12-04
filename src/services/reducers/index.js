import { combineReducers } from 'redux';
import { getIngredientsReducer } from './burger-ingredient';
import { addIngridientReducer } from './burger-constructor';
import { setIngredientDetailsReducer } from './ingredient-details';
import { setIsOpenReducer } from './modal';
import { getOrderDetailsReducer } from './order-details';
import { setCurrentTabReducer } from './tab';
import { remainDraggedIngredient } from './remain-dragged-ingredient';
import { setIngredientCounterReducer } from './ingredient-counter';
import { recoverPasswordReducer } from './password-recover'; // п.1 ПР
import { setNewPasswordReducer } from './reset-password'; // п.2 ПР
import { registerNewUserReducer } from './user-register'; // п.4 ПР
import { signInReducer } from './auth'; // п.4 ПР
import { logoutReducer } from './logout'; // п.4 ПР

export const rootReducer = combineReducers({
    getIngredientsReducer,
    addIngridientReducer,
    setIngredientDetailsReducer,
    setIsOpenReducer,
    getOrderDetailsReducer,
    setCurrentTabReducer,
    remainDraggedIngredient,
    setIngredientCounterReducer,
    recoverPasswordReducer,
    setNewPasswordReducer,
    registerNewUserReducer,
    signInReducer,
    logoutReducer
})