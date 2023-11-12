import { REMAIN_DRAGGED_INGREDIENT } from "../actions/remain-dragged-ingredient";

const initialState = {
    ingredients: null,
}

export const remainDraggedIngredient = (state = initialState, action) => {
    switch(action.type) {
        case REMAIN_DRAGGED_INGREDIENT: {
            return {
                ...state,
                ingredients:  action.ingredient
            }
        } 
        default:
                return state
    }
}