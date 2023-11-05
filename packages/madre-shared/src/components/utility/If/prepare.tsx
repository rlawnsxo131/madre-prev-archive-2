import { render } from '@testing-library/react';

export function prepare() {
  return render(
    <If
      value={key}
      caseBy={{
        a: <>Hello A</>,
        b: <>Hello B</>,
      }}
      defaultComponent={<>Default</>}
    />,
  );
}
