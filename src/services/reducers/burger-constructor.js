import { ADD_INGREDIENT } from "../actions/burger-constructor";

const initialState = {
    ingredients: [

    ]
}

export const addIngridientReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            }
        } 
        default:
                return state
    }
}