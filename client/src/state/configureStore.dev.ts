import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';

import { createRootReducer, ApplicationState, rootSaga } from "./ducks";
import sagaMiddleware from "./middlewares/saga";

export const history = createBrowserHistory();

export default function configureStore(initialState: ApplicationState) {
    const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)));

    const store = createStore(
        createRootReducer(history),
        initialState,
        middlewares
    );

    sagaMiddleware.run(rootSaga);

    return store;
};