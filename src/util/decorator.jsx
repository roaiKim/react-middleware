import { createActionHandlerDecorator } from 'react-basc';
import { createPromisedConfirmation } from 'util/ui/modal';

export function DocTitle(title = '\u200E') {
  return (target, propertyKey, descriptor) => {
    const fn = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function value(...args) {
      document.title = title;
      fn.apply(this, ...args);
    };
    return descriptor;
  };
}

export function WithConfirm(text) {
  return createActionHandlerDecorator(async (handler) => {
    const result = await createPromisedConfirmation(text);
    if (result === 'ok') {
      handler();
    }
  });
}
