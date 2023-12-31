import {
    fetchWithRefresh,
    baseUrl,
  } from "../../utils/burger-api";

  export const REFRESH_USER = "REFRESH_USER";
  export const REFRESH_USER_SUCCESS = "REFRESH_USER_SUCCESS";
  export const REFRESH_USER_FAILED = "REFRESH_USER_FAILED";


  export function refreshUserValueAction() {
    return function (dispatch) {
      dispatch({
        type: REFRESH_USER,
      });
      return fetchWithRefresh(`${baseUrl + "/auth/user"}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          authorization: localStorage.getItem("accessToken"),
        },
      })
        .then((data) => {
          dispatch({
            type: REFRESH_USER_SUCCESS,
            success: data.success,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
            isAuthChecked: true
          });
  
        })
        .catch((err) => {
          dispatch({
            type: REFRESH_USER_FAILED,
          });
        });
    };
  }