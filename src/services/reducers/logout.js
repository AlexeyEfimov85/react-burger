import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../actions/logout";

const initialState = {
    logoutRequest: false,
    logoutFailed: false,
    success: '',
    message: ''
}

export const logoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,
                success: action.success,
                message: action.message,
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
            }
        }
        default:
            return state
    }
}