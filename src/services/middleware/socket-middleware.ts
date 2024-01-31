import { refreshUserValueAction } from "../actions/refresh-user";

export const socketMiddleware = (wsActions: { wsConnect: string; onOpen: string; onClose: string; onError: string; onMessage: string; wsConnecting: string; wsDisconnect: string; }) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: any) => void) => (action: { payload?: any; type?: any; }) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = (event: { data: any; }) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
          if (parsedData.message === "jwt expired") {
            refreshUserValueAction();
          }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
/*           const functionRef = () => {
            socket = new WebSocket(action.payload);
            dispatch({ type: wsConnecting });
          };
          setTimeout(functionRef(), 100000); */
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
