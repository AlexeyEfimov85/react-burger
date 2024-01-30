import {
  GET_ORDER_FROM_SERVER_BY_NUMBER,
  GET_ORDER_FROM_SERVER_BY_NUMBER_SUCCESS,
  GET_ORDER_FROM_SERVER_BY_NUMBER_FAILED,
} from "../actions/get-order-by-number";

type InitialState = {
    request : boolean;
    requestFailed : boolean;
    success : string | undefined;
    orders : null | [];
}

const initialState: InitialState = {
    request : false,
    requestFailed : false,
    success : '',
    orders : null,
}

export const getOrderFromServerByNumberReducer = (state = initialState, action: { type: string; success: any; orders: any[]; }) => {
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
                orders: action.orders[0],
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