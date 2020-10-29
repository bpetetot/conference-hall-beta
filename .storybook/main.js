module.exports = {
  stories: [
    '../docs/app/*.story.@(js|mdx)',
    '../docs/apis/*.story.@(js|mdx)',
    '../src/**/*.story.@(js|mdx)',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true }
    },
    '@storybook/preset-create-react-app',
  ],
};