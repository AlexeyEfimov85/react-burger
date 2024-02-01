import { SET_INGREDIENT_DETAILS } from '../actions/ingredient-details';
import { DELETE_INGREDIENT_DETAILS } from '../actions/ingredient-details';

type Ingredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    key: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number | string;
    _id: string;
} 

type InitialState = {
    ingredient: Ingredient | null;
}

const initialState: InitialState = {
    ingredient: null
}

export const setIngredientDetailsReducer = (state = initialState, action: { type: string; ingredient: Ingredient; }) => {
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