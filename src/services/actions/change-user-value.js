import { fetchWithRefresh, baseUrl } from '../../utils/burger-api';

export const CHANGE_USER = "CHANGE_USER";
export const CHANGE_USER_SUCCESS = "CHANGE_USER_SUCCESS";
export const CHANGE_USER_FAILED = "CHANGE_USER_FAILED";

export function changeUserValueAction(userValue) {
    return function (dispatch) {
      dispatch({
        type: CHANGE_USER,
      });
      return fetchWithRefresh(`${baseUrl + "/auth/user"}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          authorization: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
            email: userValue.email,
            name: userValue.name,
          }),
      })
        .then((data) => {
          dispatch({
            type: CHANGE_USER_SUCCESS,
            success: data.success,
            user: data.user,
            isAuthChecked: true
          });
  
        })
        .catch((err) => {
          dispatch({
            type: CHANGE_USER_FAILED,
          });
        });
    };
  }