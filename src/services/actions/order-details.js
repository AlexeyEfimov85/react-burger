import { baseUrl } from "../../utils/burger-api";

export const GET_ORDERDETAILS = "GET_ORDERDETAILS";
export const GET_ORDERDETAILS_SUCCESS = "GET_ORDERDETAILS_SUCCESS";
export const GET_ORDERDETAILS_FAILED = "GET_ORDERDETAILS_FAILED";

export function getOrderDetailsAction(selectedIngredientsIds) {
  return function (dispatch) { 
   dispatch({
      type: GET_ORDERDETAILS,
     })
    fetch(`${baseUrl + "/orders"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ingredients: selectedIngredientsIds,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
            
          dispatch({
            type: GET_ORDERDETAILS_FAILED,
          });
        }
      })
      .then((data) => {
        dispatch({
          type: GET_ORDERDETAILS_SUCCESS,
          orderDetails: data.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDERDETAILS_FAILED,
        });
      });
  };
}


