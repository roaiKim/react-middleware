import { ConnectedRouter } from "connected-react-router";
import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { withRouter } from "react-router";
import { app } from "../app";
import { ErrorListener } from "../module";
import { ErrorBoundary } from "../util/ErrorBoundary";

interface BootstrapOption {
    componentType: ComponentType<{}>;
    errorListener: ErrorListener;
}

export function startApp(config: BootstrapOption): void {
    setupGlobalErrorHandler(config.errorListener);
    renderDOM(config.componentType);
}

function renderDOM(EntryComponent: ComponentType<any>) {
    const rootElement: HTMLDivElement = document.createElement("div");
    rootElement.style.transition = "all 150ms ease-in 100ms";
    rootElement.style.opacity = "0";
    rootElement.style.transform = "translateY(-10px) scale(0.96)";
    rootElement.id = "framework-app-root";
    document.body.appendChild(rootElement);

    const RoutedEntryComponent = withRouter(EntryComponent);
    ReactDOM.render(
        <Provider store={app.store}>
            <ConnectedRouter history={app.browserHistory}>
                <ErrorBoundary>
                    <RoutedEntryComponent />
                </ErrorBoundary>
            </ConnectedRouter>
        </Provider>,
        rootElement,
        () => {
            const rootElement = document.getElementById("framework-app-root")!;
            rootElement.style.transform = "none";
            rootElement.style.opacity = "1";
        }
    );
}

function setupGlobalErrorHandler(errorListener: ErrorListener) {
    window.onerror = (message: string | Event, source?: string, line?: number, column?: number, error?: Error): boolean => {
        if (!error) {
            error = new Error(message.toString());
        }
        // app.store.dispatch(errorAction(error));
        return true;
    };

    app.errorHandler = errorListener.onError.bind(errorListener);
}

