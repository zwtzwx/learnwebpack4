const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'; 

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bound.js'
  },
  mode: 'production',
  module: {
    rules: [
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
                require('autoprefixer')({
                  browsers: [
                    'last 10 Chrome versions',
                    'last 4 Firefox versions',
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
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash:5].css',
      chunkFilename: devMode ? [id].css : '[id].[hash:5].css'
    })
  ],
  optimization: {
    minimizer: [
      // 压缩 CSS
      new OptimizeCSSAssertsPlugin({}),
      // 压缩 JS
      new UglifyJsPlugin({
        // 有很多可以配置
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
           // 在UglifyJs删除没有用到的代码时不输出警告
           warnings: false,
           ecma: 6,
           output: {
            //  删除所有的注释
            comments: false,
            // 最紧凑的输出
            beautify: false
           },
           compress: {
            //  删除所有的 console 语句
            drop_console: true,
            // 内嵌定义了蛋只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
           }
        }
      })
    ]
  }
}
