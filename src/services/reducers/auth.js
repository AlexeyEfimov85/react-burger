import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from "../actions/auth";

const initialState = {
    signInRequest: false,
    signInFailed: false,
    success: '',
    user: null, 
    accessToken: null,
    refreshToken: null
}

export const signInReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN: {
            return {
                ...state,
                signInRequest: true,
                signInFailed: false,
            }
        }
        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                signInRequest: false,
                signInFailed: false,
                success: action.success,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case SIGN_IN_FAILED: {
            return {
                ...state,
                signInRequest: false,
                signInFailed: true,
            }
        }
        default:
            return state
    }
}