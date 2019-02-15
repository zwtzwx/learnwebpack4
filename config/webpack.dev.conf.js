const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'bound.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules:[
      // 处理 css/sass/scss
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: [
                    'last 10 Chrome versions',
                    'last 5 Firefox versions',
                    'Safari >= 6',
                    'ie > 8'
                  ]
                })
              ]
            }
            
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 更方便查看 path 的依赖
    new webpack.HotModuleReplacementPlugin() // HMR
  ],
  devServer: {
    clientLogLevel: 'warning', // 输出日志级别
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/', // 此路径下的打包文件可在浏览器下访问
    host: '0.0.0.0',
    port: 4000,
    watchOptions: {
      ignored: /node_modules/, 
      aggregateTimeout: 300, // 当你连续改动时， webpack 可以构建延迟时间，默认值
    }
  }
})