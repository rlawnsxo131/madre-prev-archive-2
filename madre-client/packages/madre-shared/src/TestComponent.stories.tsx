import { type Meta, type StoryObj } from '@storybook/react';

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

function TestComponent() {
  return <div>TestComponent</div>;
}
