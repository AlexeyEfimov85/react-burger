import { ParsedData } from "../../types/types";
import {
    USER_ORDERS_WS_CLOSE,
    USER_ORDERS_WS_CONNECTING,
    USER_ORDERS_WS_DATA,
    USER_ORDERS_WS_ERROR,
    USER_ORDERS_WS_OPEN,
  } from "./actions";
  
  const initialState = {
      status : 'OFFLINE',
      orders: [],
      error : '',
      total: 0,
      totalToday: 0,
  }
  
  export const userOrdersReducer = (state = initialState, action: { type: string; payload: ParsedData; }) => {
      switch (action.type)
      {
          case USER_ORDERS_WS_CONNECTING:
              return {
                  ...state,
                  status: 'CONNECTING'
              };
          case USER_ORDERS_WS_OPEN:
              return {
                  ...state,
                  status: 'ONLINE',
                  error: ''
              };
          case USER_ORDERS_WS_CLOSE:
              return {
                  ...state,
                  status: 'OFFLINE',
              };
          case USER_ORDERS_WS_ERROR:
              return {
                  ...state,
                  error: action.payload.error
              };
          case USER_ORDERS_WS_DATA:
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
  