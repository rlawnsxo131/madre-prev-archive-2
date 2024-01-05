// /**
//  * @TODO selector 관련 작업중
//  */
// import { type Meta, type StoryObj } from '@storybook/react';
// import {
//   type ChangeEvent,
//   createContext,
//   type ReactNode,
//   useContext,
//   useState,
// } from 'react';

// import { createStore } from './lib/external-store/createStore';

// // const Ctx = createContext(store);

// // function TestProvider({ children }: { children: ReactNode }) {
// //       const store = useRef(useCreateExternalStoreContext({ name1: '', name2: '' }));

// //   return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
// // }
// const useStore = createStore<{
//   name1: string;
//   name2: string;
//   setName1: (name: string) => void;
//   setName2: (name: string) => void;
// }>((set) => ({
//   name1: '',
//   name2: '',
//   setName1: (value: string) => set(() => ({ name1: value })),
//   setName2: (value: string) => set(() => ({ name2: value })),
// }));

// function Input1() {
//   const { name1, setName1 } = useStore();

//   return (
//     <input
//       name="name1"
//       value={name1}
//       onChange={(e: ChangeEvent<HTMLInputElement>) => setName1(e.target.value)}
//     />
//   );
// }

// function Input2() {
//   const { name2, setName2 } = useStore();

//   return (
//     <input
//       name="name2"
//       value={name2 as any}
//       onChange={(e: ChangeEvent<HTMLInputElement>) => setName2(e.target.value)}
//     />
//   );
// }

// function TestComponent() {
//   const [state, setState] = useState(false);
//   return (
//     <>
//       <button onClick={() => setState((prev) => !prev)}>click</button>
//       {state ? 'true' : 'false'}
//       {/* <TestProvider> */}
//       <Input1 />
//       <Input2 />
//       {/* </TestProvider> */}
//     </>
//   );
// }

// const meta = {
//   title: 'test/TestComponent',
//   component: TestComponent,
//   parameters: {
//     layout: 'fullscreen',
//   },
//   tags: ['autodocs'],
//   argTypes: {},
// } satisfies Meta<typeof TestComponent>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {},
//   render: () => <TestComponent />,
// };
