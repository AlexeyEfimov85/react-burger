import {SET_OPEN, SET_CLOSE} from '../actions/modal';

type InitialState = {
    isOpen: boolean; 
}

const initialState: InitialState = {
    isOpen: false
}

export const setIsOpenReducer = (state = initialState, action: { type: string; }) => {
    switch(action.type) {
        case SET_OPEN: {
            return {
                isOpen: true
            }
        }
        case SET_CLOSE: {
            return {
                isOpen: false
            }
        }
        default:
            return state;
    }
}