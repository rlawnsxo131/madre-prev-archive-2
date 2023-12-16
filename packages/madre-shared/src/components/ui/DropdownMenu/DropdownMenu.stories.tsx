import { type Meta, type StoryObj } from '@storybook/react';

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
        {({ visible, close, toggle }) => (
          <DropdownMenu.Root touchOutside={close}>
            <DropdownMenu.Trigger>
              <button onClick={toggle}>메뉴열기</button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              visible={visible}
              isPortal
              portalProps={{
                container: () => document.querySelector('.dropdown-menu'),
              }}
            >
              <DropdownMenu.Item>item1</DropdownMenu.Item>
              <DropdownMenu.Item>item2</DropdownMenu.Item>
              <DropdownMenu.Item>item3</DropdownMenu.Item>
              <DropdownMenu.Item>item4</DropdownMenu.Item>
              <DropdownMenu.Item>item5</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </DropdownMenu>
      <div className="dropdown-menu" />
    </>
  ),
};
