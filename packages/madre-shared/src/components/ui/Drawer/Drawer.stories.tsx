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
type Story = Omit<StoryObj<typeof meta>, 'args'>;

export const Default: Story = {
  render: () => {
    const [position, setPosition] =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useState<ComponentProps<typeof Drawer.Content>['position']>('left');

    return (
      <Drawer>
        <Drawer.Root>
          <Drawer.Trigger>
            <button onClick={() => setPosition('top')}>위</button>
          </Drawer.Trigger>
          <Drawer.Trigger>
            <button onClick={() => setPosition('right')}>오른쪽</button>
          </Drawer.Trigger>
          <Drawer.Trigger>
            <button onClick={() => setPosition('bottom')}>아래</button>
          </Drawer.Trigger>
          <Drawer.Trigger>
            <button onClick={() => setPosition('left')}>왼쪽</button>
          </Drawer.Trigger>
          <Drawer.Content position={position} rootMargin={'100px'}>
            <Drawer.Item>
              <span>1</span>
            </Drawer.Item>
            <Drawer.Item>
              <span>2</span>
            </Drawer.Item>
            <Drawer.Item>
              <span>3</span>
            </Drawer.Item>
            <Drawer.Item>
              <span>4</span>
            </Drawer.Item>
            <Drawer.Item>
              <span>5</span>
            </Drawer.Item>
          </Drawer.Content>
        </Drawer.Root>
      </Drawer>
    );
  },
};
