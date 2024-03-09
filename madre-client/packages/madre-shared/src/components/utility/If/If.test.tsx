import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { If, type IfProps } from './If';

function prepare(predicate: IfProps['predicate']) {
  return render(<If predicate={predicate}>a</If>);
}

describe('<If />는', () => {
  it(`'true' 라는 값을 주면 'a' 가 렌더링 된다.`, () => {
    const controls = prepare(true);

    expect(controls.getByText('a')).toBeInTheDocument();
  });

  it(`'() => true' 라는 함수를 주면 'a' 가 렌더링 된다.`, () => {
    const controls = prepare(() => true);

    expect(controls.getByText('a')).toBeInTheDocument();
  });

  it(`'false' 라는 값을 주면 'a' 는 렌더링되면 안된다.`, () => {
    const controls = prepare(false);

    expect(controls.queryByText('a')).not.toBeInTheDocument();
  });

  it(`'() => false' 라는 함수를 주면 'a' 가 렌더링되면 안된다.`, () => {
    const controls = prepare(() => false);

    expect(controls.queryByText('a')).not.toBeInTheDocument();
  });
});
