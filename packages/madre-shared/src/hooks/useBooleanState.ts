import { useCallback, useState } from 'react';

export function useBooleanState(initialState: boolean | (() => boolean)) {
  const [state, setState] = useState(
    typeof initialState === 'function' ? initialState() : initialState,
  );

  const onSetStateToTrue = useCallback(() => {
    setState(true);
  }, []);

  const onSetStateToFalse = useCallback(() => {
    setState(false);
  }, []);

  return {
    state,
    onSetStateToTrue,
    onSetStateToFalse,
  };
}
