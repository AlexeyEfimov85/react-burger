import { TGetOrderByNumber } from "../../types/types";
import {
  GET_ORDER_FROM_SERVER_BY_NUMBER,
  GET_ORDER_FROM_SERVER_BY_NUMBER_SUCCESS,
  GET_ORDER_FROM_SERVER_BY_NUMBER_FAILED,
} from "../actions/get-order-by-number";

type InitialState = {
    request : boolean;
    requestFailed : boolean;
    success : boolean;
    order : null | TGetOrderByNumber[];
}

const initialState: InitialState = {
    request : false,
    requestFailed : false,
    success : false,
    order : null,
}

export const getOrderFromServerByNumberReducer = (state = initialState, action: { type: string; success: boolean; orders: TGetOrderByNumber[]; }) => {
    switch(action.type) {
        case GET_ORDER_FROM_SERVER_BY_NUMBER: {
            return {
                ...state,
                request: true,
                requestFailed: false,
            }
        }
        case GET_ORDER_FROM_SERVER_BY_NUMBER_SUCCESS: {
            return {
                ...state,
                request: true,
                requestFailed: false,
                success: action.success,
                order: action.orders,
            }
        }
        case GET_ORDER_FROM_SERVER_BY_NUMBER_FAILED: {
            return {
                ...state,
                request: false,
                requestFailed: true,
            }
        }
        default:
            return state
    }
}