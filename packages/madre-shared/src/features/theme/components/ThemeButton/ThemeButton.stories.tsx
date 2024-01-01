import { type Meta, type StoryObj } from '@storybook/react';

import {
  ThemeServiceProvider,
  withThemeChangeEventListener,
} from '../../services';
import { ThemeButton } from './ThemeButton';

const meta = {
  title: 'features/theme/ThemeButton',
  component: ThemeButton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ThemeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const Comp = withThemeChangeEventListener({
      Component: () => <ThemeButton {...args} />,
    });

    return (
      <ThemeServiceProvider>
        <Comp />
      </ThemeServiceProvider>
    );
  },
};
