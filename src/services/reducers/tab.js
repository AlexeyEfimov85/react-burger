import { SET_CURRENT_TAB_ONE, SET_CURRENT_TAB_TWO, SET_CURRENT_TAB_THREE } from "../actions/tab";

const initialState = {
    currentTab: 'one'
}

export const setCurrentTabReducer = (state = initialState, action) => {
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