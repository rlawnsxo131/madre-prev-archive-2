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
type Story = Omit<StoryObj<typeof meta>, 'args'>;

export const Default: Story = {
  render: () => (
    <>
      <DropdownMenu>
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
          <DropdownMenu.Content
            align="left"
            isPortal
            portalProps={{
              container: () => $('.dropdown-menu'),
            }}
          >
            <DropdownMenu.Item>
              <a href="/">item1</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/">item2</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/">item3</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/">item4</a>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <a href="/">item5</a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </DropdownMenu>
      <DropdownMenu>
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
          <DropdownMenu.Content
            align="left"
            isPortal
            portalProps={{
              container: () => $('.dropdown-menu'),
            }}
          >
            <DropdownMenu.Item>
              <a href="/">가나다라마바사아자차카타파하</a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </DropdownMenu>
      <div className="dropdown-menu" />
    </>
  ),
};
