## webpack 使用 Babel7 
1. 需要安装的包
    + @babel/core 
    + @babel/runtime
    + @babel/preset-env
    + @babel/plugin-transform-runtime
    + babel-loader
2. 配置 **.babelrc**
    > "presets": ["@babel/preset-env"], "plugins":["@babel/plugin-transform-runtime"]
3. 配置 **webpack.config.js**
    > {test: /\.js$/, loader:}

## webpack 为 sass 添加 source map
> 配置 source map 是为了当出现错误时方便进行定位调试
``` javascript
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
        }
    ]
}
```

## webpack 为 css 添加 css3 前缀
> `postcss` 是一个利用 javascript 工具和插件转换 css 代码的工具，功能强大，最常用的就是利用PostCSS帮我们Autoprefixer 自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。
``` bash
npm i D postcss-loader autoprefixer postcss-import
// postcss-import: 在使用 @import css 的时候让 webpack 可以监听并编译
// postcss-nextcss: 支持 css4
```
``` javascript
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
```

## 抽离样式表为单独的 css 文件并打版本号
> 抽离 css 前提是在生产环境，因此配置文件的 mode: production，另外抽离了 css 就不能使用 style-loader 注入到 html 文件
``` shell
npm i -D mini-css-extract-plugin
```
``` javascript
"script": {
    "dist": "cross-env NODE_ENV=production npx webpack --progress --config webpack.prod.config.js"
}
```

## webpack 压缩 JS 和 CSS
> 压缩的作用是为了减小包的体积，提升加载效率，因此压缩都是配置在生产环境
``` shell
npm i -D optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```
> 由于 Uglify-js 不支持 es6 语法，所以可以改用 terser插件
```
npm i -D terser-webpack-plugin
```