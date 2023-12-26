import { baseUrl, request } from "../../utils/burger-api";

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";

export function signInAction(userValue) {
  return function (dispatch) {
    dispatch({
      type: SIGN_IN,
    });
    request(`${baseUrl + "/auth/login"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: userValue.login,
        password: userValue.password,
      }),
    })
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        dispatch({
          type: SIGN_IN_SUCCESS,
          success: data.success,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
          isAuthChecked: true,
        });

      })
      .catch((err) => {
        dispatch({
          type: SIGN_IN_FAILED,
        });
      });
  };
}
