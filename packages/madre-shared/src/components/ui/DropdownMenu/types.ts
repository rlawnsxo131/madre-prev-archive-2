import type { ContextType } from 'react';

import type { DropdownMenuContext } from './DropdownMenuProvider';

export type DropdownMenuChildren = (
  props: NonNullable<ContextType<typeof DropdownMenuContext>>,
) => JSX.Element;
