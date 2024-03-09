export function once<T, F extends (this: T, ...args: any[]) => any>(fn: F) {
  let called = false;
  let result: ReturnType<F>;

  return function (this: T, ...args: any[]) {
    if (!called) {
      result = fn.apply(this, args);
      called = true;
    }
    return result;
  };
}
