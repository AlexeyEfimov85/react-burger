import { baseUrl, request } from "../../utils/burger-api";

export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD_FAILED';
type Value = {
  codeValue: string;
  passwordValue: string;
}

export function setNewPasswordAction(value: Value) {
    return function(dispatch: (arg0: { type: string; success?: any; message?: any; }) => void) {
        dispatch({
            type: SET_NEW_PASSWORD
        })
        request(`${baseUrl + '/password-reset/reset'}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                password: value.passwordValue,
                token: value.codeValue,
            }),
          })
          .then ((data) => {
            dispatch({
                type: SET_NEW_PASSWORD_SUCCESS,
                success: data.success,
                message: data.message
            })
          })
          .catch((err) => {
            dispatch({
                type: SET_NEW_PASSWORD_FAILED
            })
          })
    }
}