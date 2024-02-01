import { INCREASE_INGREDIENT_COUNTER, CHANGE_ELEMENTS_ORDER, ADD_INGREDIENT } from '../actions/ingredient-counter';

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
    cart: Ingredient[];
}

const initialState: InitialState = {
    cart: [],

}


export const setIngredientCounterReducer = (state = initialState, action: { type: string; ingredient: any; }) => {
    switch (action.type) {
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