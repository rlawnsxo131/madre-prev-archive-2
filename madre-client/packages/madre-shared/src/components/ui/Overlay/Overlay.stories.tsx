import { type Meta, type StoryObj } from '@storybook/react';

import { Overlay } from './Overlay';

const meta = {
  title: 'ui/Overlay',
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Overlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: false,
    duration: 0.15,
  },
  render: (args) => <Overlay {...args} />,
};
