// type HandlerDecorator = (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;

export function DocTitle(title = '\u200E') {
  return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<() => void>) => {
    const fn = descriptor.value!;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function value(...args) {
      document.title = title;
      fn.apply(this, ...args);
    };
    return descriptor;
  };
}
