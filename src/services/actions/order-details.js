import { baseUrl, request } from "../../utils/burger-api";
import { refreshUserValueAction } from "./refresh-user";

export const GET_ORDERDETAILS = "GET_ORDERDETAILS";
export const GET_ORDERDETAILS_SUCCESS = "GET_ORDERDETAILS_SUCCESS";
export const GET_ORDERDETAILS_FAILED = "GET_ORDERDETAILS_FAILED";

export function getOrderDetailsAction(selectedIngredientsIds) {
  return function (dispatch) { 
   dispatch({
      type: GET_ORDERDETAILS,
     })
      request(`${baseUrl + "/orders"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          ingredients: selectedIngredientsIds,
        }),
      })
      .then((data) => {
        dispatch({
          type: GET_ORDERDETAILS_SUCCESS,
          orderDetails: data.order.number,
        });
        if(data.message === "jwt expired") {
          refreshUserValueAction()
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDERDETAILS_FAILED,
        });
      });
  };
}


