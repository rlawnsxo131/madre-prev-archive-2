import { type Context, useContext } from 'react';

export function useSafeContext<T>(Context: Context<T>) {
  const context = useContext(Context);
  if (!context) {
    throw new Error(`not found ${Context.displayName || 'Context'}`);
  }
  return context;
}
