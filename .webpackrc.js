const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      publicPath: '/'
    },
    production: {
      publicPath: './'
    }
  },
  proxy: {
      '/': {
        target: 'http://tutortest.pgyxwd.com',
        changeOrigin: true,
        pathRewrite: {'^/': ''}
      }
  },
  outputPath: path.resolve(__dirname, './admin-dva'),
  hash: true,
  html: {
    template: './src/index.ejs',
    filename: path.resolve(__dirname, './admin-dva/index.html')
  }
};