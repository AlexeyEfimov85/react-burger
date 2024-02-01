import { REMAIN_PARTHNAME } from "../actions/remain-parthname";

type InitialState = {
    parthname: string | null;
}

const initialState: InitialState = {
    parthname : null,
}

export const remainParthname = (state = initialState, action: { type: string; parthname: string | null; }) => {
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