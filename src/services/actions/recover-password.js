import { baseUrl, request } from "../../utils/burger-api";

export const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
export const RECOVER_PASSWORD_SUCCESS = 'RECOVER_PASSWORD_SUCCESS';
export const RECOVER_PASSWORD_FAILED = 'RECOVER_PASSWORD_FAILED';
export function recoverPasswordAction(email) {
    return function(dispatch) {
        dispatch({
            type: RECOVER_PASSWORD
        })
        request(`${baseUrl + '/password-reset'}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email: email,
            }),
          })
          .then ((data) => {
            dispatch({
                type: RECOVER_PASSWORD_SUCCESS,
                success: data.success,
                message: data.message
            })
          })
          .catch((err) => {
            dispatch({
                type: RECOVER_PASSWORD_FAILED
            })
          })
    }
}
