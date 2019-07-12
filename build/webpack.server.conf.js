const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');

const serverWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'node',
  entry: {
    home: path.join(__dirname, '../client/serverHome.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server-[name].js',
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },
  // 去除依赖，不打包到生成的文件中
  // 打包出来的代码是运行在node环境中的，这些类库是可以通过require()方式调用的
  externals: Object.keys(require('../package.json').dependencies),
  devtool: 'cheap-module-eval-source-map'
});

module.exports = serverWebpackConfig;
