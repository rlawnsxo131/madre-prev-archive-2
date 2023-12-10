/**
 * ui components
 */
export type { ButtonProps } from './components/ui/Button/Button';
export { Button } from './components/ui/Button/Button';
export type { IconsProps } from './components/ui/Icons/Icons';
export { Icons } from './components/ui/Icons/Icons';
export type { OverlayProps } from './components/ui/Overlay/Overlay';
export { Overlay } from './components/ui/Overlay/Overlay';

/**
 * utility components
 */
export type { IfProps } from './components/utility/If/If';
export { If } from './components/utility/If/If';
export type { SwitchCaseProps } from './components/utility/SwitchCase/SwitchCase';
export { SwitchCase } from './components/utility/SwitchCase/SwitchCase';

/**
 * hooks
 */
export { useCombinedRefs } from './hooks/useCombinedRefs';
export { useIsomorphicLayoutEffect } from './hooks/useIsomorphicLayoutEffect';
export { usePreservedCallback } from './hooks/usePreservedCallback';
export { usePreservedReference } from './hooks/usePreservedReference';
export { usePrevious } from './hooks/usePrevious';
export type {
  EffectRef,
  EffectRefCallback,
  EffectRefCleanupCallback,
} from './hooks/useRefEffect';
export { useRefEffect } from './hooks/useRefEffect';

/**
 * features
 */
export type { ThemeButtonProps } from './features/theme/components/ThemeButton/ThemeButton';
export { ThemeButton } from './features/theme/components/ThemeButton/ThemeButton';
export type { Theme } from './features/theme/models/models';
export { ThemeModel } from './features/theme/models/models';
export { themeService } from './features/theme/services/themeService';

/**
 * lib
 */
export type { Storage } from './lib/storage/safeStorage';
export {
  generateSessionStorage,
  generateStorage,
  safeLocalStorage,
  safeSessionStorage,
} from './lib/storage/safeStorage';
export { isClient } from './lib/utils/isClient';
export { isServer } from './lib/utils/isServer';
