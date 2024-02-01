import { refreshUserValueAction } from "../actions/refresh-user";
import { ParsedData } from "../../types/types";

export const socketMiddleware = (wsActions: { wsConnect: string; onOpen: string; onClose: string; onError: string; onMessage: string; wsConnecting: string; wsDisconnect: string; }) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: any) => void) => (action: { payload: string | URL; type?: string; }) => {
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
        const error: string = "Error";
          dispatch({ type: onError, payload: {error: error} });
        };

        socket.onmessage = (event: { data: string; }) => {
          const { data } = event;
          const parsedData: ParsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
          if (parsedData.message === "jwt expired") {
                      refreshUserValueAction();
                    }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
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
