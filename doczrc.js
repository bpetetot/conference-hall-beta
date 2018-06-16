export default {
  title: 'Doc',
  description: 'Conference Hall components collection.',

  source: './src',
  port: 3001,
  wrapper: '.docz/docz',

  modifyBundlerConfig: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}
