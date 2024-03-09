import { type Meta, type StoryObj } from '@storybook/react';

import { $ } from '../../../lib/utils';
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
  args: {
    align: 'left',
    duration: 0.15,
    isPortal: true,
    portalProps: {
      container: () => $('.dropdown-menu'),
    },
    children: null,
  },
  render: ({ children: _, ...args }) => (
    <>
      <DropdownMenu {...args}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button
              onClick={() =>
                new Promise((resolve) => setTimeout(() => resolve(1), 150))
              }
            >
              메뉴열기
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {[1, 2, 3, 4, 5].map((v) => (
              <DropdownMenu.Item key={v}>
                <a href="/">item{v}</a>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </DropdownMenu>
      <div className="dropdown-menu" />
    </>
  ),
};
