module.exports = {
  stories: ['../**/*.stories.(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true }
    },
    '@storybook/preset-create-react-app',
  ],
};