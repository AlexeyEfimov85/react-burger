export const ALL_ORDER_CONNECT = 'ALL_ORDER_CONNECT';
export const ALL_ORDER_DISCONNECT = 'ALL_ORDER_DISCONNECT';
export const ALL_ORDERS_WS_CONNECTING = 'ALL_ORDERS_WS_CONNECTING';
export const ALL_ORDERS_WS_OPEN = 'ALL_ORDERS_WS_OPEN';
export const ALL_ORDERS_WS_CLOSE = 'ALL_ORDERS_WS_CLOSE';
export const ALL_ORDERS_WS_DATA = 'ALL_ORDERS_WS_DATA';
export const ALL_ORDERS_WS_ERROR = 'ALL_ORDERS_WS_ERROR';


export const connect = (url) => ({
    type: ALL_ORDER_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: ALL_ORDER_DISCONNECT,
});