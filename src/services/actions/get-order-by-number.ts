import { TGetOrderByNumber } from "../../types/types";
import { baseUrl, request } from "../../utils/burger-api";

export const GET_ORDER_FROM_SERVER_BY_NUMBER = 'GET_ORDER_FROM_SERVER_BY_NUMBER';
export const GET_ORDER_FROM_SERVER_BY_NUMBER_SUCCESS = 'GET_ORDER_FROM_SERVER_BY_NUMBER_SUCCESS';
export const GET_ORDER_FROM_SERVER_BY_NUMBER_FAILED = 'GET_ORDER_FROM_SERVER_BY_NUMBER_FAILED';



export function getOrderFromServerByNumber(number: number){
    return function (dispatch: (arg0: { type: string; success?: string; orders?: TGetOrderByNumber[]; }) => void) {
        dispatch({
          type: GET_ORDER_FROM_SERVER_BY_NUMBER,
        });
        request(`${baseUrl + `/orders/${number}`}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        })
          .then((data) => {
            dispatch({
              type: GET_ORDER_FROM_SERVER_BY_NUMBER_SUCCESS,
              success: data.success,
              orders: data.orders,
            });
    
          })
          .catch((err) => {
            dispatch({
              type: GET_ORDER_FROM_SERVER_BY_NUMBER_FAILED,
            });
          });
      };
}
