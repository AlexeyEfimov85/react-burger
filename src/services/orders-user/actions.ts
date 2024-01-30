export const USER_ORDER_CONNECT = 'USER_ORDER_CONNECT';
export const USER_ORDER_DISCONNECT = 'USER_ORDER_DISCONNECT';
export const USER_ORDERS_WS_CONNECTING = 'USER_ORDERS_WS_CONNECTING';
export const USER_ORDERS_WS_OPEN = 'USER_ORDERS_WS_OPEN';
export const USER_ORDERS_WS_CLOSE = 'USER_ORDERS_WS_CLOSE';
export const USER_ORDERS_WS_DATA = 'USER_ORDERS_WS_DATA';
export const USER_ORDERS_WS_ERROR = 'USER_ORDERS_WS_ERROR';


export const connectUserOrders = (url: string) => ({
    type: USER_ORDER_CONNECT,
    payload: url
});

export const disconnectUserOrders = () => ({
    type: USER_ORDER_DISCONNECT,
});