import { type Meta, type StoryObj } from '@storybook/react';

import { Icons } from './Icons';

const meta = {
  title: 'ui/Icons',
  component: Icons,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Icons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'sun',
  },
  render: (args) => <Icons {...args} />,
};
