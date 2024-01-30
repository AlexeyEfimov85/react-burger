import { RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED} from '../actions/recover-password';

type InitialState = {
    recoverPasswordRequest: boolean;
    recoverPasswordRequestFailed: boolean;
    success: any;
    message: string;
}

const initialState: InitialState = {
    recoverPasswordRequest: false,
    recoverPasswordRequestFailed: false,
    success: false,
    message: '',
}

export const recoverPasswordReducer = (state = initialState, action: { type: string; success: any; message: string; }) => {
    switch(action.type) {
        case RECOVER_PASSWORD: {
            return {
                ...state,
                recoverPasswordRequest: true,
            }
        }
        case RECOVER_PASSWORD_SUCCESS: {
            return {
                ...state,
                recoverPasswordRequest: false,
                recoverPasswordRequestFailed: false,
                success: action.success,
                message: action.message,
            }
        }
        case RECOVER_PASSWORD_FAILED: {
            return {
                ...state,
                recoverPasswordRequestFailed: true,
            }
        }
        default:
            return state
    }
}