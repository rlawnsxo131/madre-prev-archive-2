/**
 * @TODO selector 관련 작업중
 */
import { type Meta, type StoryObj } from '@storybook/react';
import {
  type ChangeEvent,
  createContext,
  type ReactNode,
  useState,
} from 'react';

import {
  createExternalStore,
  type ExternalStore,
  //   useCreateExternalStoreContext,
  useExternalStoreContext,
} from './hooks/useExternalStoreContext';

const Ctx = createContext<ExternalStore<{
  name1: string;
  name2: string;
}> | null>(null);

const store = createExternalStore({ name1: '', name2: '' });

function TestProvider({ children }: { children: ReactNode }) {
  //     const store = useRef(useCreateExternalStoreContext({ name1: '', name2: '' }));
  //   const store = useRef(createExternalStore({ name1: '', name2: '' }));

  //   return <Ctx.Provider value={store.current}>{children}</Ctx.Provider>;
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;

  //   return (
  //     <Ctx.Provider value={createExternalStore({ name1: '', name2: '' })}>
  //       {children}
  //     </Ctx.Provider>
  //   );
}

function Input1() {
  const [{ name1 }, set1] = useExternalStoreContext(Ctx);

  return (
    <input
      name="name1"
      value={name1}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        set1({ [e.target.name]: e.target.value })
      }
    />
  );
}

function Input2() {
  const [{ name2 }, set2] = useExternalStoreContext(Ctx);

  return (
    <input
      name="name2"
      value={name2 as any}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        set2({ [e.target.name]: e.target.value })
      }
    />
  );
}

function TestComponent() {
  const [state, setState] = useState(false);
  return (
    <>
      <button onClick={() => setState((prev) => !prev)}>click</button>
      {state ? 'true' : 'false'}
      <TestProvider>
        <Input1 />
        <Input2 />
      </TestProvider>
    </>
  );
}

const meta = {
  title: 'test/TestComponent',
  component: TestComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <TestComponent />,
};
