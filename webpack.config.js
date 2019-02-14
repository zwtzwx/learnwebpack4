const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bound.js'
    },
    mode: 'development',
    module: {
        rules: [
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
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: loader => [
                                // 可以配置多个插件
                                require('autoprefixer')({
                                    browsers: ['> 0.15% in CN']
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    }
}