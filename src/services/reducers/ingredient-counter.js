import {INCREASE_INGREDIENT_COUNTER, CHANGE_ELEMENTS_ORDER, ADD_INGREDIENT} from '../actions/ingredient-counter';

const initialState = {
    cart: [],

    }


export const setIngredientCounterReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                cart: [...state.cart, action.ingredient]
            }
        } 
        case INCREASE_INGREDIENT_COUNTER: {
            return {
                ...state,
                cart: action.ingredient,
            }
        }
        case CHANGE_ELEMENTS_ORDER: {
            return {
                ...state,
                cart: action.ingredient,
            }
        }
        default:
            return state
    }
}