import {SET_OPEN, SET_CLOSE} from '../actions/modal';

const initialState = {
    isOpen: false
}

export const setIsOpenReducer = (state = initialState, action) => {
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