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
      menu: ['Getting started', 'APIs'],
    },
  ],

  themeConfig: {
    showPlaygroundEditor: true,

    styles: {
      body: {
        fontFamily: 'Arial, Helvetica, sans-serif',
      },
      container: {
        width: ['90%', '100%', '100%'],
        padding: ['20px', '0 40px 40px'],
        fontSize: 16,
      },
      paragraph: {
        margin: '20px 0px 10px 0px',
      },
      h1: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '32px',
      },
      h2: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '24px',
        borderBottomStyle: 'solid',
        fontWeight: 600,
      },
      h3: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '20px',
        fontWeight: 600,
      },
      ol: {
        listStyle: 'decimal',
        margin: '0px 0px 20px 40px',
        '& li::before': {
          content: 'none',
        },
      },
      ul: {
        listStyle: 'initial',
        margin: '0px 0px 20px 40px',
        '& li::before': {
          content: 'none',
        },
      },
      blockquote: {
        fontSize: 16,
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
