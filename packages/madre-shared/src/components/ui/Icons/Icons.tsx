import { type SVGProps } from 'react';

import { CrescentMoonIcon, SunIcon } from './IconComponents';

export type IconsProps = SVGProps<SVGSVGElement> & {
  type: 'sun' | 'crescent-moon';
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
