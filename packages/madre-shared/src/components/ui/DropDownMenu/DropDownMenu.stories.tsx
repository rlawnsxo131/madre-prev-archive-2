import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (_) => (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        {({ onClick }) => <Button onClick={onClick}>click</Button>}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>item1</DropdownMenu.Item>
        <DropdownMenu.Item>item2</DropdownMenu.Item>
        <DropdownMenu.Item>item3</DropdownMenu.Item>
        <DropdownMenu.Item>item4</DropdownMenu.Item>
        <DropdownMenu.Item>item5</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};
