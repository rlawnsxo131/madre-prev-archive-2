import { useMemo, useState } from 'react';

/**
 * @description boolean 값을 편하게 사용하기 위해 사용합니다.
 */
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
