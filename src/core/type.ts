import {RouterState} from "connected-react-router";
import {ErrorHandler} from "./module";

export interface LoadingState {
    [loading: string]: number;
}

export interface State {
    loading: LoadingState;
    app: {};
    router: RouterState;
}

export interface ErrorListener {
    onError: ErrorHandler;
}
