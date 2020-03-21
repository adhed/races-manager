import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer, ApplicationState, rootSaga } from "./ducks";
import sagaMiddleware from "./middlewares/saga";

export default function configureStore(initialState: ApplicationState) {
    const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
    const store = createStore(rootReducer, initialState, middlewares);

    sagaMiddleware.run(rootSaga);

    return store;
};