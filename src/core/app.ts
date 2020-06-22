import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory, History} from "history";
import {applyMiddleware, compose, createStore, Store, StoreEnhancer, Middleware} from "redux";
import {ActionHandler, ErrorHandler} from "./module";
import {LOADING_ACTION, rootReducer, State, executeMethod} from "./reducer";

declare const window: any;

interface App {
    readonly browserHistory: History;
    readonly store: Store<State>;
    readonly actionHandlers: {[actionType: string]: ActionHandler};
    errorHandler: ErrorHandler | null;
}

function composeWithDevTools(enhancer: StoreEnhancer): StoreEnhancer {
    let composeEnhancers = compose;
    if (process.env.NODE_ENV !== "production") {
        const extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        if (extension) {
            composeEnhancers = extension({
                // Ref: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
                actionsBlacklist: [LOADING_ACTION],
            });
        }
    }
    return composeEnhancers(enhancer);
}

function createApp(): App {
    const browserHistory = createBrowserHistory();
    const store: Store<State> = createStore(rootReducer(browserHistory), composeWithDevTools(applyMiddleware(routerMiddleware(browserHistory), executeMethod as Middleware)));

    return {
        browserHistory,
        store,
        actionHandlers: {},
        errorHandler: null
    };
}

export const app = createApp();
