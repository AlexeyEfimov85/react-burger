import { GET_ORDERDETAILS, GET_ORDERDETAILS_SUCCESS, GET_ORDERDETAILS_FAILED } from '../actions/order-details';

type InitialState = {
    orderDetailsRequest: boolean;
    orderDetailsFailed: boolean;
    orderDetails: number | null; 
}

const initialState: InitialState = {
    orderDetailsRequest: false,
    orderDetailsFailed: false,
    orderDetails: null,
}

export const getOrderDetailsReducer = (state = initialState, action: { type: string; orderDetails: number; }) => {
    switch(action.type) {
        case GET_ORDERDETAILS: {
            return {
                ...state,
                orderDetailsRequest: true,
                orderDetailsFailed: false,
            }
        }
        case GET_ORDERDETAILS_SUCCESS: {
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: false,
                orderDetails: action.orderDetails
            }
        }
        case GET_ORDERDETAILS_FAILED: {
            return {
                ...state,
                orderDetailsRequest: false,
                orderDetailsFailed: true,
            }
        }
        default:
            return state
    }
}