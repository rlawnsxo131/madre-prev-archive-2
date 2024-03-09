import { type Meta, type StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const meta = {
  title: 'ui/Accordion',
  component: Accordion,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: ({ children: _, ...args }) => (
    <Accordion {...args}>
      <Accordion.Root>
        <Accordion.Trigger>
          <button>click</button>
        </Accordion.Trigger>
        <Accordion.Content>
          <Accordion.Item></Accordion.Item>
        </Accordion.Content>
      </Accordion.Root>
    </Accordion>
  ),
};
