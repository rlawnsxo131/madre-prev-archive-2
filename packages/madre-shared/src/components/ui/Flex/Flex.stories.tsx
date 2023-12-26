import { type Meta, type StoryObj } from '@storybook/react';

import { Flex } from './Flex';

const meta = {
  title: 'ui/Flex',
  component: Flex,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'row',
    justify: 'start',
    align: 'start',
    alignSelf: 'auto',
    wrap: 'no',
    gap: 0,
  },
  render: (args) => (
    <Flex {...args}>
      <div>1</div>
      <div>1</div>
    </Flex>
  ),
};
