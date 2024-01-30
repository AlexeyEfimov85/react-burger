import { SET_CURRENT_TAB_ONE, SET_CURRENT_TAB_TWO, SET_CURRENT_TAB_THREE } from "../actions/tab";

type InitialState = {
    currentTab: string;
}

const initialState: InitialState = {
    currentTab: 'one'
}

export const setCurrentTabReducer = (state = initialState, action: { type: string; }) => {
    switch(action.type) {
        case SET_CURRENT_TAB_ONE: {
            return {
                currentTab: 'one'
            }
        }
        case SET_CURRENT_TAB_TWO: {
            return {
                currentTab: 'two'
            }
        }
        case SET_CURRENT_TAB_THREE: {
            return {
                currentTab: 'three'
            }
        }
        default:
            return state;
    }
}