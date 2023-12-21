import { VisibleContextGenerator } from '../../../contexts/generator';
import { DropdownMenuContent } from './DropdownMenuContent/DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem/DropdownMenuItem';
import { DropdownMenuRoot } from './DropdownMenuRoot/DropdownMenuRoot';
import { DropdownMenuTrigger } from './DropdownMenuTrigger/DropDownMenuTrigger';

export const DropdownMenu = Object.assign(VisibleContextGenerator.excute(), {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
});
