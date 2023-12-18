import { type SVGAttributes } from 'react';

import { CrescentMoonIcon, SunIcon } from './IconComponents';

export type IconsProps = {
  type: 'sun' | 'crescent-moon';
  className?: SVGAttributes<SVGAElement>['className'];
  style?: SVGAttributes<SVGAElement>['style'];
};

export function Icons({ type, ...props }: IconsProps) {
  switch (type) {
    case 'sun':
      return <SunIcon {...props} />;
    case 'crescent-moon':
      return <CrescentMoonIcon {...props} />;
    default:
      return null;
  }
}
