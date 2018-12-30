export default {
  title: 'Conference Hall',
  description: 'Contribute to Conference Hall',

  port: 3001,
  wrapper: 'docs/app/wrapper',
  codeSandbox: false,

  menu: [
    'Home',
    'Contributing',
    'Installation',
    'Components',
    'APIs',
    'Code of conduct',
    'Changelog',
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
        margin: '0px 0px 10px 0px',
      },
      h1: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '32px',
        marginBottom: '16px !important',
        '::before': {
          background: 'transparent !important',
        },
      },
      h2: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '24px',
        borderBottomStyle: 'solid',
        fontWeight: 600,
        paddingBottom: '0px !important',
        marginBottom: '16px !important',
        marginTop: '1.5em !important',
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
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    })
    config.module.rules.push({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}
