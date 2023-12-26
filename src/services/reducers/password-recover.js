import { RECOVER_PASSWORD, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAILED} from '../actions/recover-password';

const initialState = {
    recoverPasswordRequest: false,
    recoverPasswordRequestFailed: false,
    success: false,
    message: '',
}

export const recoverPasswordReducer = (state = initialState, action) => {
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