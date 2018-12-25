export default {
  title: 'Conference Hall',
  description: 'Contribute to Conference Hall',

  port: 3001,
  wrapper: '.docz/wrapper',
  codeSandbox: false,

  menu: [
    'Getting Started',
    {
      name: 'Components',
      menu: [
        'Avatar',
        'Badge',
        'Button',
        'Confirmation Popin',
        'Drawer',
        'Modal',
        'Snackbar',
        'Toggle',
      ],
    },
    {
      name: 'Cloud functions',
      menu: [
        'Getting started',
        'APIs',
      ],
    },
  ],

  themeConfig: {
    showPlaygroundEditor: true,

    styles: {
      h1: {
        fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
        fontSize: [42],
      },
      h2: {
        fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
      },
    },
  },

  modifyBundlerConfig: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}
