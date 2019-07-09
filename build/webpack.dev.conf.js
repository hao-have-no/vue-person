'use strict'
//开发模式下配置文件

//引入工具集合的文件
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 合并插件类似object.assign合并公共部分
const merge = require('webpack-merge')
// node的path工具函数
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
// webpack 复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 html 并且注入到 .html 文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 自动检索下一个可用端口
const portfinder = require('portfinder')

//获取在process.env中定义的ｈｏｓｔ和ｐｏｒｔ
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    //css-loader的组件的补充
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // // 检测开发环境下是否生成source map(并且生成的模式是怎么样)，用于在线调试
  //关联知识：在ｐａｃｋｊｓｏｎ文件中ｄｅｖ的运行脚本中
  //progress,将进度显示到控制台中
  //inline启动内敛模式，处理实时重载的监本，并插入ｂｕｎｄｌｅ中，并且将构建的信息显示到控制台中
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/main.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    //启动热更新
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,//是否自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,// 指的是url的访问路径前缀
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,//与监视文件相关的控制选项。
    }
  },
  plugins: [
    /*
      https://doc.webpack-china.org/plugins/define-plugin/
      允许在环境中产生一个全局变量, 例如下面'process.env', 就等于隔壁文件夹 dev.env.js export出来的内容
      具体的规则看上方api
      但是以下定义的变量在配置文件中去引用会报错,只允许在服务中编写的代码中使用
    */
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    /*
      模块热替换(Hot Module Replacement 或 HMR)

      当上面的 devServer中 hot:true时, 这个模块必须存在,不然webpack会报错.
      这个模块结合上面的hot是用于,
      检测到页面更新,在不刷新页面的情况下替换内容,
      如果hot: true与这个模块均不存在, 则跟旧版本的 dev-middleware/hot-*一样,修改即会刷新
    */
    new webpack.HotModuleReplacementPlugin(),

    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    /*
      https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      该插件将为你生成一个HTML5文件

      配置项文档
      https://github.com/jantimon/html-webpack-plugin#configuration

      会结合base.conf.js设置中的 入口文件和输出文件,
      将内容根据输出filename.生成js文件 script到当前的html种
    */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  // 使用插件去判断当前端口是否可用
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          // 添加终端提示内容
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
