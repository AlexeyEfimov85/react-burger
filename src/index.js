import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/index";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";

import {
  ALL_ORDER_CONNECT,
  ALL_ORDER_DISCONNECT,
  ALL_ORDERS_WS_CLOSE,
  ALL_ORDERS_WS_CONNECTING,
  ALL_ORDERS_WS_DATA,
  ALL_ORDERS_WS_ERROR,
  ALL_ORDERS_WS_OPEN,
} from "./services/orders-all/actions";
import {
  USER_ORDER_CONNECT,
  USER_ORDER_DISCONNECT,
  USER_ORDERS_WS_CLOSE,
  USER_ORDERS_WS_CONNECTING,
  USER_ORDERS_WS_DATA,
  USER_ORDERS_WS_ERROR,
  USER_ORDERS_WS_OPEN,
} from "./services/orders-user/actions";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers();
const allOrdersMiddleware = socketMiddleware({
  wsConnect: ALL_ORDER_CONNECT,
  onOpen : ALL_ORDERS_WS_OPEN,
  onClose : ALL_ORDERS_WS_CLOSE,
  onError : ALL_ORDERS_WS_ERROR,
  onMessage : ALL_ORDERS_WS_DATA,
  wsConnecting : ALL_ORDERS_WS_CONNECTING,
  wsDisconnect : ALL_ORDER_DISCONNECT,
});

const userOrdersMiddleware = socketMiddleware({
  wsConnect: USER_ORDER_CONNECT,
  onOpen : USER_ORDERS_WS_OPEN,
  onClose : USER_ORDERS_WS_CLOSE,
  onError : USER_ORDERS_WS_ERROR,
  onMessage : USER_ORDERS_WS_DATA,
  wsConnecting : USER_ORDERS_WS_CONNECTING,
  wsDisconnect : USER_ORDER_DISCONNECT,
})

const middleware = applyMiddleware(thunk, allOrdersMiddleware, userOrdersMiddleware)

const store = createStore(
  rootReducer,
  compose(middleware, enhancer)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
