import { useMemo, useState } from 'react';

export function useBoolState() {
  const [bool, setBool] = useState(false);

  const actions = useMemo(
    () => ({
      setValue(value: boolean) {
        setBool(value);
      },
      setTrue() {
        setBool(true);
      },
      setFalse() {
        setBool(false);
      },
      toggle() {
        setBool((prev) => !prev);
      },
    }),
    [setBool],
  );

  return {
    bool,
    actions,
  };
}
