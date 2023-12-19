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
          <DropdownMenu.Root onClickOutside={close}>
            <DropdownMenu.Trigger>
              <button onClick={toggle}>메뉴열기</button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              visible={visible}
              align="left"
              isPortal
              portalProps={{
                container: () => document.querySelector('.dropdown-menu'),
              }}
            >
              <DropdownMenu.Item>
                <span>item1</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>item2</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>item3</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>item4</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>item5</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </DropdownMenu>
      <div className="dropdown-menu" />
    </>
  ),
};
