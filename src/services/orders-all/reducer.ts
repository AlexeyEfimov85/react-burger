import {
    ALL_ORDERS_WS_CLOSE,
    ALL_ORDERS_WS_CONNECTING,
    ALL_ORDERS_WS_DATA,
    ALL_ORDERS_WS_ERROR,
    ALL_ORDERS_WS_OPEN,
} from "./actions";

import { ParsedData } from "../../types/types";

type InitialState = {
    status: string;
    orders: [],
    error: string;
    total: number;
    totalToday: number;
}

const initialState: InitialState = {
    status: 'OFFLINE',
    orders: [],
    error: '',
    total: 0,
    totalToday: 0,
}
export const allOrdersReducer = (state = initialState, action:
    { type: string; payload: ParsedData }) => {
    switch (action.type) {
        case ALL_ORDERS_WS_CONNECTING:
            return {
                ...state,
                status: 'CONNECTING'
            };
        case ALL_ORDERS_WS_OPEN:
            return {
                ...state,
                status: 'ONLINE',
                error: ''
            };
        case ALL_ORDERS_WS_CLOSE:
            return {
                ...state,
                status: 'OFFLINE',
            };
        case ALL_ORDERS_WS_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case ALL_ORDERS_WS_DATA:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        default:
            return state;
    }
}
