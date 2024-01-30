
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/burger-ingredient';

type InitialState = {
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredients: [];
}

const initialState: InitialState =
{
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
}


export const getIngredientsReducer = (state = initialState, action: { type: string; ingredients: []; }) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }
        default:
            return state
    }

}

