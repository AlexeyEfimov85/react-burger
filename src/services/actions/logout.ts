import { baseUrl, request } from "../../utils/burger-api";

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function logoutAction() {
    return function(dispatch: (arg0: { type: string; success?: any; message?: string; }) => void) {
        dispatch({
            type: LOGOUT
        })
        request(`${baseUrl + "/auth/logout"}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              token: localStorage.getItem('refreshToken'),  
            }),
          })
          .then((data) => {
            dispatch({
              type: LOGOUT_SUCCESS,
              success: data.success,
              message: data.message,
            });
          })
          .catch((err) => {
            dispatch({
              type: LOGOUT_FAILED,
            });
          });
    }   
}