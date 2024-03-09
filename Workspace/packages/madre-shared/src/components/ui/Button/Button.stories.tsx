import { type Meta, type StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';

import { Flex } from '../Flex';
import { Button } from './Button';

const meta = {
  title: 'ui/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'button',
    theme: 'primary',
    size: 'medium',
    radius: 'medium',
    fullWidth: false,
    disabled: false,
  },
  render: (args) => {
    const _args = {
      children: args.children,
      radius: args.radius,
      style: { marginRight: '1rem' },
    };

    const ItemBox = ({ children }: { children: ReactNode }) => (
      <Flex align="center" style={{ marginBottom: '1rem' }}>
        {children}
      </Flex>
    );

    return (
      <Flex direction="column">
        <ItemBox>
          <Button {...args} />
        </ItemBox>

        {/* variant solid */}
        <ItemBox>
          <Button size="small" {..._args} />
          <Button {..._args} />
          <Button size="large" {..._args} />
          <Button size="large" fullWidth {..._args} />
        </ItemBox>
        <ItemBox>
          <Button theme="primary-low" size="small" {..._args} />
          <Button theme="primary-low" {..._args} />
          <Button theme="primary-low" size="large" {..._args} />
          <Button theme="primary-low" size="large" fullWidth {..._args} />
        </ItemBox>
        <ItemBox>
          <Button theme="secondary" size="small" {..._args} />
          <Button theme="secondary" {..._args} />
          <Button theme="secondary" size="large" {..._args} />
          <Button theme="secondary" size="large" fullWidth {..._args}>
            hello
          </Button>
        </ItemBox>
        <ItemBox>
          <Button theme="warn" size="small" {..._args} />
          <Button theme="warn" {..._args} />
          <Button theme="warn" size="large" {..._args} />
          <Button theme="warn" size="large" fullWidth {..._args} />
        </ItemBox>

        {/* variant outline */}
        <ItemBox>
          <Button variant="outline" size="small" {..._args} />
          <Button variant="outline" {..._args} />
          <Button variant="outline" size="large" {..._args} />
          <Button variant="outline" size="large" fullWidth {..._args} />
        </ItemBox>
        <ItemBox>
          <Button
            variant="outline"
            theme="primary-low"
            size="small"
            {..._args}
          />
          <Button variant="outline" theme="primary-low" {..._args} />
          <Button
            variant="outline"
            theme="primary-low"
            size="large"
            {..._args}
          />
          <Button
            variant="outline"
            theme="primary-low"
            size="large"
            fullWidth
            {..._args}
          />
        </ItemBox>
        <ItemBox>
          <Button variant="outline" theme="secondary" size="small" {..._args} />
          <Button variant="outline" theme="secondary" {..._args} />
          <Button variant="outline" theme="secondary" size="large" {..._args} />
          <Button
            variant="outline"
            theme="secondary"
            size="large"
            fullWidth
            {..._args}
          >
            hello
          </Button>
        </ItemBox>
        <ItemBox>
          <Button variant="outline" theme="warn" size="small" {..._args} />
          <Button variant="outline" theme="warn" {..._args} />
          <Button variant="outline" theme="warn" size="large" {..._args} />
          <Button
            variant="outline"
            theme="warn"
            size="large"
            fullWidth
            {..._args}
          />
        </ItemBox>

        {/* variant ghost */}
        <ItemBox>
          <Button variant="ghost" size="small" {..._args} />
          <Button variant="ghost" {..._args} />
          <Button variant="ghost" size="large" {..._args} />
          <Button variant="ghost" size="large" fullWidth {..._args} />
        </ItemBox>
        <ItemBox>
          <Button variant="ghost" theme="primary-low" size="small" {..._args} />
          <Button variant="ghost" theme="primary-low" {..._args} />
          <Button variant="ghost" theme="primary-low" size="large" {..._args} />
          <Button
            variant="ghost"
            theme="primary-low"
            size="large"
            fullWidth
            {..._args}
          />
        </ItemBox>
        <ItemBox>
          <Button variant="ghost" theme="secondary" size="small" {..._args} />
          <Button variant="ghost" theme="secondary" {..._args} />
          <Button variant="ghost" theme="secondary" size="large" {..._args} />
          <Button
            variant="ghost"
            theme="secondary"
            size="large"
            fullWidth
            {..._args}
          >
            hello
          </Button>
        </ItemBox>
        <ItemBox>
          <Button variant="ghost" theme="warn" size="small" {..._args} />
          <Button variant="ghost" theme="warn" {..._args} />
          <Button variant="ghost" theme="warn" size="large" {..._args} />
          <Button
            variant="ghost"
            theme="warn"
            size="large"
            fullWidth
            {..._args}
          />
        </ItemBox>
      </Flex>
    );
  },
};
