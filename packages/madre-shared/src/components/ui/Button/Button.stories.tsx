import type { Meta, StoryObj } from '@storybook/react';
import type { PropsWithChildren } from 'react';

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

    const Wrapper = ({ children }: PropsWithChildren) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
    );

    const AttributeWrapper = ({ children }: PropsWithChildren) => (
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
      >
        {children}
      </div>
    );

    return (
      <Wrapper>
        <AttributeWrapper>
          <Button {..._args} />
        </AttributeWrapper>

        {/* variant solid */}
        <AttributeWrapper>
          <Button size="small" {..._args} />
          <Button {..._args} />
          <Button size="large" {..._args} />
          <Button size="large" fullWidth {..._args} />
        </AttributeWrapper>
        <AttributeWrapper>
          <Button theme="primary-low" size="small" {..._args} />
          <Button theme="primary-low" {..._args} />
          <Button theme="primary-low" size="large" {..._args} />
          <Button theme="primary-low" size="large" fullWidth {..._args} />
        </AttributeWrapper>
        <AttributeWrapper>
          <Button theme="secondary" size="small" {..._args} />
          <Button theme="secondary" {..._args} />
          <Button theme="secondary" size="large" {..._args} />
          <Button theme="secondary" size="large" fullWidth {..._args}>
            hello
          </Button>
        </AttributeWrapper>
        <AttributeWrapper>
          <Button theme="warn" size="small" {..._args} />
          <Button theme="warn" {..._args} />
          <Button theme="warn" size="large" {..._args} />
          <Button theme="warn" size="large" fullWidth {..._args} />
        </AttributeWrapper>

        {/* variant outline */}
        <AttributeWrapper>
          <Button variant="outline" size="small" {..._args} />
          <Button variant="outline" {..._args} />
          <Button variant="outline" size="large" {..._args} />
          <Button variant="outline" size="large" fullWidth {..._args} />
        </AttributeWrapper>
        <AttributeWrapper>
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
        </AttributeWrapper>
        <AttributeWrapper>
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
        </AttributeWrapper>
        <AttributeWrapper>
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
        </AttributeWrapper>

        {/* variant ghost */}
        <AttributeWrapper>
          <Button variant="ghost" size="small" {..._args} />
          <Button variant="ghost" {..._args} />
          <Button variant="ghost" size="large" {..._args} />
          <Button variant="ghost" size="large" fullWidth {..._args} />
        </AttributeWrapper>
        <AttributeWrapper>
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
        </AttributeWrapper>
        <AttributeWrapper>
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
        </AttributeWrapper>
        <AttributeWrapper>
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
        </AttributeWrapper>
      </Wrapper>
    );
  },
};
