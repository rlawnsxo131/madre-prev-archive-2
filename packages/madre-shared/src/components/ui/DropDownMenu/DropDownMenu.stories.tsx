import type { Meta, StoryObj } from '@storybook/react';

import { DropDownMenu } from './DropDownMenu';

const meta = {
  title: 'ui/DropDownMenu',
  component: DropDownMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (_) => (
    <DropDownMenu>
      <DropDownMenu.Trigger />
      <DropDownMenu.Content />
      <DropDownMenu.Item />
    </DropDownMenu>
  ),
};
