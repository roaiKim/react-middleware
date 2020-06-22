// type HandlerDecorator = (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<ActionHandler>) => TypedPropertyDescriptor<ActionHandler>;

export function DocTitle (title: string = '\u200E') {
  return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<() => void>) => {
    const fn = descriptor.value!
    descriptor.value = function value (...args) {
      document.title = title
      fn.apply(this, ...args)
    }
    return descriptor
  }
}

export function format (target: any, key: string | symbol) {}
