import { REMAIN_PARTHNAME } from "../actions/remain-parthname";

const initialState = {
    parthname : null,
}

export const remainParthname = (state = initialState, action) => {
    switch(action.type) {
        case REMAIN_PARTHNAME: {
            return {
                ...state,
                parthname:  action.parthname
            }
        } 
        default:
                return state
    }
}