import { useMemo, useState } from 'react';

/**
 * @description boolean 값을 편하게 사용하기 위해 사용합니다.
 */
export function useBoolState() {
  const [bool, setBool] = useState(false);

  const actions = useMemo(
    () => ({
      set: setBool,
      setTrue: () => setBool(true),
      setFalse: () => setBool(false),
      toggle: () => setBool((prev) => !prev),
    }),
    [],
  );

  return [bool, actions] as const;
}
