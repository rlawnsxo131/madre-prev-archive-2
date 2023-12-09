import type { SVGProps } from 'react';

import { NightIcon } from './NightIcon';
import { SunIcon } from './SunIcon';

export type IconsProps = SVGProps<SVGSVGElement> & {
  type: 'sun' | 'night';
};

export function Icons({ type, ...props }: IconsProps) {
  switch (type) {
    case 'sun':
      return <SunIcon {...props} />;
    case 'night':
      return <NightIcon {...props} />;
    default:
      return null;
  }
}
