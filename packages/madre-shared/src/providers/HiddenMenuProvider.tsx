import {
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useSafeContext } from '../hooks/useSafeContext';

const HiddenMenuStateContext = createContext<{ visible: boolean } | null>(null);
HiddenMenuStateContext.displayName = 'HiddenMenuStateContext';

const HiddenMenuActionsContext = createContext<{
  set: (visible: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
} | null>(null);
HiddenMenuActionsContext.displayName = 'HiddenMenuActionsContext';

export type HiddneMenuProviderProps<
  F extends (...args: any[]) => any = (...args: any[]) => any,
> = {
  children: ReactNode;
  lifeCycle?: {
    beforeOpen?: F;
    beforeClose?: F;
  };
};

/**
 * @description 특정 액션을 통해 노출여부를 결정하는 컴포넌트에서 공통으로 사용중인 Provider 입니다.
 * lifeCycle 을 통해 state 를 변경전 action 을 실행할 수 있도록 합니다.
 * before action 만 지원하는 이유는, 해당 provider 를 사용하여 노출 유무를 선택하는 컴포넌트가
 * after event 를 컨트롤할 수 있도록 인터페이스를 열어두기 때문 입니다.
 *
 * @description 예를 들어 trigger 에 onClick event 를 넘긴다면 close/open 이벤트와 동시에 onClick 이벤트를 실행합니다.
 * close/open 이벤트 실행바로 뒤 onClick 이벤트가 작동하는데, 이때 visible state 의 변화는 즉각 트리거 되므로,
 * 해당 이벤트가 실행되었음을 보장합니다. UX 상 닫히는 transition 이 작동함과 동시에 해당 이벤트가 실행 되는것은 큰 지장이 없으므로
 * 위와같이 이벤트를 핸들링 합니다.
 * 
 * @example
 * const child = Children.only(children);
 * const { close } = useDropdownMenuActions();
 * 
 * return (
 *  <li ref={ref} className={classNames(styles.DropdownMenuItem, className)}>
 *    {cloneElement(children, {
 *      onClick: () => {
 *        close();
 *        child.props.onClick?.();
 *      },
 *    })}
 *  </li>
  );
 *
 * @param children
 * @param lifeCycle
 *
 */
export function HiddenMenuProvider({
  children,
  lifeCycle,
}: HiddneMenuProviderProps) {
  const [visible, setVisible] = useState(false);
  const prevVisible = useRef(visible);

  const actions = useMemo(
    () => ({
      set: async (visible: boolean) =>
        await Promise.resolve(
          (visible ? lifeCycle?.beforeOpen : lifeCycle?.beforeClose)?.(),
        ).then((_) => setVisible(visible)),
      open: async () =>
        await Promise.resolve(lifeCycle?.beforeOpen?.()).then(() =>
          setVisible(true),
        ),
      close: async () =>
        await Promise.resolve(lifeCycle?.beforeClose?.()).then(() =>
          setVisible(false),
        ),
      toggle: async () => {
        const nextState = !prevVisible.current;
        return await Promise.resolve(
          (nextState ? lifeCycle?.beforeOpen : lifeCycle?.beforeClose)?.(),
        ).then(() => setVisible(nextState));
      },
    }),
    [lifeCycle],
  );

  useEffect(() => {
    prevVisible.current = visible;
  }, [visible]);

  return (
    <HiddenMenuStateContext.Provider value={{ visible }}>
      <HiddenMenuActionsContext.Provider value={actions}>
        {children}
      </HiddenMenuActionsContext.Provider>
    </HiddenMenuStateContext.Provider>
  );
}

export function useHiddenMenu() {
  const state = useSafeContext(HiddenMenuStateContext);
  const actions = useSafeContext(HiddenMenuActionsContext);
  return [state, actions] as const;
}

export function useHiddenMenuState() {
  return useSafeContext(HiddenMenuStateContext);
}

export function useHiddenMenuActions() {
  return useSafeContext(HiddenMenuActionsContext);
}
