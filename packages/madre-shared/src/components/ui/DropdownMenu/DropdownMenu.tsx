import { DropdownMenuContent } from './DropdownMenuContent/DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem/DropdownMenuItem';
import { DropdownMenuContainer } from './DropdownMenuProvider';
import { DropdownMenuRoot } from './DropdownMenuRoot/DropdownMenuRoot';
import { DropdownMenuTrigger } from './DropdownMenuTrigger/DropDownMenuTrigger';

export const DropdownMenu = Object.assign(DropdownMenuContainer, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
});
