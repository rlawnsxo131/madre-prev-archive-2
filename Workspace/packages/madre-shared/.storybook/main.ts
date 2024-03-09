import { mergeConfig } from 'vite';
import { type StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/**/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      assetsInclude: ['/sb-preview/runtime.js'],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @use '../src/styles/main.scss';
            `,
          },
        },
      },
    });
  },
};
export default config;