import {SET_NEW_PASSWORD, SET_NEW_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILED} from '../actions/reset-password';

type InitialState = {
    setNewPasswordRequest: boolean;
    setNewPasswordRequestFailed: boolean;
    success: any;
    message: string;
}

const initialState: InitialState = {
    setNewPasswordRequest: false,
    setNewPasswordRequestFailed: false,
    success: false,
    message: '',
}

export const setNewPasswordReducer = (state = initialState, action: { type: string; success: any; message: string; }) => {
    switch(action.type) {
        case SET_NEW_PASSWORD: {
            return {
                ...state,
                setNewPasswordRequest: true,
            }
        }
        case SET_NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                setNewPasswordRequest: false,
                setNewPasswordRequestFailed: false,
                success: action.success,
                message: action.message,
            }
        }
        case SET_NEW_PASSWORD_FAILED: {
            return {
                ...state,
                recoverPasswordRequestFailed: true,
            }
        }
        default:
            return state
    }
}