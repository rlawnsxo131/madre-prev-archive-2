import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { DropdownMenu } from './DropdownMenu';

const meta = {
  title: 'ui/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, 'args'>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      {({ visible, toggle }) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button onClick={toggle}>click</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content visible={visible}>
            <DropdownMenu.Item>item1</DropdownMenu.Item>
            <DropdownMenu.Item>item2</DropdownMenu.Item>
            <DropdownMenu.Item>item3</DropdownMenu.Item>
            <DropdownMenu.Item>item4</DropdownMenu.Item>
            <DropdownMenu.Item>item5</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </DropdownMenu>
  ),
};
