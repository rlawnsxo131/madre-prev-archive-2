import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps, useState } from 'react';

import { Drawer } from './Drawer';

const meta = {
  title: 'ui/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'left',
    duration: 0.15,
    withOverlay: true,
    withScrollLock: false,
    children: null,
  },
  render: ({ children: _, ...args }) => (
    <Drawer {...args}>
      <Drawer.Root>
        <Drawer.Trigger>
          <button>클릭</button>
        </Drawer.Trigger>
        <Drawer.Content>
          {[1, 2, 3, 4].map((v) => (
            <Drawer.Item key={v}>
              <span>item{v}</span>
            </Drawer.Item>
          ))}
        </Drawer.Content>
      </Drawer.Root>
    </Drawer>
  ),
};
