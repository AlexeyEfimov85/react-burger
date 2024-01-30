import { REGISTER_NEW_USER, REGISTER_NEW_USER_SUCCESS, REGISTER_NEW_USER_FAILED } from '../actions/user-register';

type InitialState = {
    registerNewUserRequest: boolean;
    registerNewUserFailed: boolean;
    success: string;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

const initialState: InitialState = {
    registerNewUserRequest: false,
    registerNewUserFailed: false,
    success: '',
    user: {
        email: '',
        name: ''
    },
    accessToken: '',
    refreshToken: ''
}

export const registerNewUserReducer = (state = initialState, action: { type: string; success: string; user: any; accessToken: string; refreshToken: string; }) => {
    switch (action.type) {
        case REGISTER_NEW_USER: {
            return {
                ...state,
                registerNewUserRequest: true,
                registerNewUserFailed: false,
            }
        }
        case REGISTER_NEW_USER_SUCCESS: {
            return {
                ...state,
                registerNewUserRequest: false,
                registerNewUserFailed: false,
                success: action.success,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case REGISTER_NEW_USER_FAILED: {
            return {
                ...state,
                registerNewUserRequest: false,
                registerNewUserFailed: true,
            }
        }
        default:
            return state
    }
}
