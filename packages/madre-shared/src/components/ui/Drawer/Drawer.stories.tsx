import { type Meta, type StoryObj } from '@storybook/react';

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
  render: () => (
    <Drawer>
      {({ visible, toggle, close }) => (
        <Drawer.Root onClickOutside={close}>
          <Drawer.Trigger>
            <button onClick={toggle}>클릭</button>
          </Drawer.Trigger>
          <Drawer.Content visible={visible}>
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
      )}
    </Drawer>
  ),
};
