import { useCallback, useState } from 'react';

export function useBooleanState(initialState: boolean | (() => boolean)) {
  const [state, setState] = useState(
    typeof initialState === 'function' ? initialState() : initialState,
  );

  const onSetValueToTrue = useCallback(() => {
    setState(true);
  }, []);

  const onSetValueToFalse = useCallback(() => {
    setState(false);
  }, []);

  return {
    state,
    onSetValueToTrue,
    onSetValueToFalse,
  };
}
