import {app} from "./app";
import {ActionHandler, LifecycleDecoratorFlag, TickIntervalDecoratorFlag} from "./module";
import {ModuleLifecycleListener} from "./platform/Module";
import {loadingAction, State} from "./reducer";

/**
 * Decorator type declaration, required by TypeScript
 */
type HandlerDecorator = (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;
type LifecycleHandlerDecorator = (target: object, propertyKey: keyof ModuleLifecycleListener, descriptor: TypedPropertyDescriptor<ActionHandler & LifecycleDecoratorFlag>) => TypedPropertyDescriptor<ActionHandler>;
type OnTickHandlerDecorator = (target: object, propertyKey: "onTick", descriptor: TypedPropertyDescriptor<ActionHandler & TickIntervalDecoratorFlag>) => TypedPropertyDescriptor<ActionHandler>;

type HandlerInterceptor<S> = (handler: ActionHandler, rootState: Readonly<S>) => any;

/**
 * A helper for ActionHandler functions (Saga)
 */
export function createActionHandlerDecorator<S extends State = State>(interceptor: HandlerInterceptor<S>): HandlerDecorator {
    return (target, propertyKey, descriptor) => {
        const fn = descriptor.value!;
        descriptor.value = function(...args: any[]) {
            const rootState: S = app.store.getState() as S;
            interceptor(fn.bind(this, ...args), rootState);
        };
        return descriptor;
    };
}

/**
 * To mark state.loading[identifier] during Saga execution
 */
export function Loading(identifier: string = "global"): HandlerDecorator {
    return createActionHandlerDecorator(async handler => {
        try {
            app.store.dispatch(loadingAction(true, identifier));
            await handler();
        } finally {
            app.store.dispatch(loadingAction(false, identifier));
        }
    });
}

/**
 * Required decorator when using lifecycle actions, including onRender/onDestroy/...
 */
export function Lifecycle(): LifecycleHandlerDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.isLifecycle = true;
        return descriptor;
    };
}

/**
 * Used for onTick action, to specify to tick interval in second
 */
export function Interval(second: number): OnTickHandlerDecorator {
    return (target, propertyKey, descriptor) => {
        descriptor.value!.tickInterval = second;
        return descriptor;
    };
}

/**
 * If specified, the Saga action cannot be entered by other threads during execution
 * Useful for error handler action
 */
export function Mutex(): HandlerDecorator {
    let isLocked = false;
    return createActionHandlerDecorator(async function(handler) {
        if (!isLocked) {
            try {
                isLocked = true;
                await handler();
            } finally {
                isLocked = false;
            }
        }
    });
}

