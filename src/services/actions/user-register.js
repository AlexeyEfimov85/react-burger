import { baseUrl, request } from "../../utils/burger-api";
import { refreshUserValueAction } from "./refresh-user";

export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const REGISTER_NEW_USER_SUCCESS = 'REGISTER_NEW_USER_SUCCESS';
export const REGISTER_NEW_USER_FAILED = 'REGISTER_NEW_USER_FAILED';

export function registerNewUserAction(userValue) {
    return function(dispatch) {
        dispatch({
            type: REGISTER_NEW_USER
        })
        request(`${baseUrl + "/auth/register"}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email: userValue.login, 
                password: userValue.password, 
                name: userValue.name 
            }),
          })
          .then((data) => {
            localStorage.setItem("accessToken", data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            dispatch({
              type: REGISTER_NEW_USER_SUCCESS,
              success: data.success,
              user : data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken
            });
            
          })
          .then((data) => {
            dispatch(refreshUserValueAction());
          })
          .catch((err) => {
            dispatch({
              type: REGISTER_NEW_USER_FAILED,
            });
          });
    }   
}