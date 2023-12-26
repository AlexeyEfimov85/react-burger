import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED } from "../actions/auth";
import { REFRESH_USER, REFRESH_USER_SUCCESS, REFRESH_USER_FAILED } from "../actions/refresh-user";
import { CHANGE_USER, CHANGE_USER_SUCCESS, CHANGE_USER_FAILED } from "../actions/change-user-value";

const initialState = {
    signInRequest: false,
    signInFailed: false,
    success: '',
    user: null, 
    accessToken: null,
    refreshToken: null,
    isAuthChecked: false
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
                refreshToken: action.refreshToken,
                isAuthChecked: action.isAuthChecked
            }
        }
        case SIGN_IN_FAILED: {
            return {
                ...state,
                signInRequest: false,
                signInFailed: true,
            }
        }
        case REFRESH_USER: {
            return {
                ...state,
                signInRequest: true,
                signInFailed: false,
            }
        }
        case REFRESH_USER_SUCCESS: {
            return {
                ...state,
                signInRequest: false,
                signInFailed: false,
                success: action.success,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isAuthChecked: action.isAuthChecked
            }
        }
        case REFRESH_USER_FAILED: {
            return {
                ...state,
                signInRequest: false,
                signInFailed: true,
            }
        }
        case CHANGE_USER: {
            return {
                ...state,
                signInRequest: true,
                signInFailed: false,
            }
        }
        case CHANGE_USER_SUCCESS: {
            return {
                ...state,
                signInRequest: false,
                signInFailed: false,
                success: action.success,
                user: action.user,
            }
        }
        case CHANGE_USER_FAILED: {
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