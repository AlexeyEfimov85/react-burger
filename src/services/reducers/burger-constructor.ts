import { ADD_INGREDIENT } from "../actions/burger-constructor";

type InitialState = {
    ingredients: [];
}

const initialState: InitialState = {
    ingredients: [

    ]
}

export const addIngridientReducer = (state = initialState, action: { type: string; ingredient: []; }) => {
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