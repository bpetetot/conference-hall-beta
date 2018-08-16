export default {
  title: 'Components',
  description: 'Components collection.',

  src: './src',
  port: 3001,
  wrapper: '.docz/wrapper',
  dist: '.docz/build',
  ordering: 'ascending',
  protocol: 'http',

  modifyBundlerConfig: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}
