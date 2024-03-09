import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';

import { usePreservedCallback } from './usePreservedCallback';
import { usePreservedReference } from './usePreservedReference';

/**
 * @link https://lodash.com/docs/4.17.15#debounce
 *
 * @description lodash debounce 를 조금더 편하게 사용하기 위한 hook 입니다.
 * @description leading 과 trailing 이 true 라면 throttle 처럼 사용
 *
 * @param callback
 * @param wait
 * @param options - leading, trailing, maxWait
 */
export function useDebounce<F extends (...args: any[]) => any>(
  callback: F,
  wait: number,
  options: Parameters<typeof debounce>[2] = {},
) {
  const preservedCallback = usePreservedCallback(callback);
  const preservedOptions = usePreservedReference(options);

  const debounced = useMemo(() => {
    return debounce(preservedCallback, wait, preservedOptions);
  }, [preservedCallback, preservedOptions, wait]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}
