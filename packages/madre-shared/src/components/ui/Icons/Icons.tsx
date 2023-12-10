import type { SVGAttributes } from 'react';

import { CrescentMoonIcon, SunIcon } from './IconComponents';

export type IconsProps = {
  type: 'sun' | 'crescentMoon';
  className?: string;
  style?: SVGAttributes<SVGAElement>['style'];
};

export function Icons({ type, ...props }: IconsProps) {
  switch (type) {
    case 'sun':
      return <SunIcon {...props} />;
    case 'crescentMoon':
      return <CrescentMoonIcon {...props} />;
    default:
      return null;
  }
}
