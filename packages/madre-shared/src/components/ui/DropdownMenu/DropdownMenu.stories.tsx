import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuContent } from './DropdownMenuContent/DropdownMenuContent';

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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // noop
    children: (_) => <div />,
  },
  render: (_) => (
    <DropdownMenu>
      {({ visible, toggle }) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button onClick={toggle}>click</Button>
          </DropdownMenu.Trigger>
          <DropdownMenuContent visible={visible}>
            <DropdownMenu.Item>item1</DropdownMenu.Item>
            <DropdownMenu.Item>item2</DropdownMenu.Item>
            <DropdownMenu.Item>item3</DropdownMenu.Item>
            <DropdownMenu.Item>item4</DropdownMenu.Item>
            <DropdownMenu.Item>item5</DropdownMenu.Item>
          </DropdownMenuContent>
        </DropdownMenu.Root>
      )}
    </DropdownMenu>
  ),
};
