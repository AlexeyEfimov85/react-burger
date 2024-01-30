import { SET_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { DELETE_INGREDIENT_DETAILS } from '../actions/ingredient-details';

type InitialState = {
    ingredient: null;
}

const initialState: InitialState = {
    ingredient: null
}

export const setIngredientDetailsReducer = (state = initialState, action: { type: string; ingredient: any; }) => {
    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: action.ingredient
            }
        }
        case DELETE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: null
            }
        }
        default:
            return state
    }
}