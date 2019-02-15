const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptiMizeCssAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const BoundleAnalyzerPlugin = require('webpack-bundle-analyzer').BoundleAnalyzerPlugin
const devMode = process.env.NODE_ENV !== 'production';

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bound.[hash:5].js'
  },
  module: {
    rules: [
      // 处理 css/sass/scss
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer') ({
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
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name]-[hash:5].css',
      chunkFilename: devMode ? '[id].css' : '[id]-[hash:5].css'
    }),
    new cleanWebpackPlugin(['dist'], {
      root: process.cwd()
    }),  // 这个目录是相对于配置文件所在文件夹下的目录
    // 打包分析
    new BoundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      // 压缩 JS
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          ecma: 6,
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true
          }
        }
      }),
      // 压缩 CSS
      new OptiMizeCssAssertsPlugin({})
    ]
  }
})