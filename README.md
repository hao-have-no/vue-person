# person-vue

> person for vue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```


随笔：纪录在升级与ｔｙｐｅｓｃｒｉｐｔ的过程中遇到的问题
１．Ａｐｐ．ｖｕｅ无法导入使用，需要在ｔｓｃｏｎｆｉｇ增加我们自己解析方式
"typeRoots":[
"./types",
"./node_modules/vue/types"
]

还有其他的一些不识别，总之最后ｔｓｃｏｎｇｉｇ中变为
{
        "exclude": [
          "node_modules"
        ],
        "compilerOptions": {
          "allowSyntheticDefaultImports": true,
          "allowJs": true,
          "module": "es2015",
          "target": "es5",
          "moduleResolution": "node",
          "experimentalDecorators": true,
          "isolatedModules": true,
          "typeRoots": [
            "./types",
            "./node_modules/vue/types"
          ],
          "lib": [
            "es2017",
            "dom"
          ],
          "sourceMap": true,
          "pretty": true
        }
      }

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


通过vue的插件方式来进行ssr,vue-server-renderer:vue的渲染器(服务端)
vue-server-renderer:生成模版html.通过请求返回页面给予前端

构建思路:
webpack生成两个包(通过两部分的协作):
1.server bundle
2.client bundle

执行步骤:(请求先进服务器端包,找到对应的处理逻辑,生成页面返回给前端)

1.createRouter:创建路由
2.csr和ssr统一入口,creatapp.js,通过上下文,挂载路由到实例上
csr:挂载到#app上
ssr:entey-server:异步加载读取文件,通过promiss请求数据,到达ready状态时,给路由传递url值,进行页面跳转
###服务端渲染,我们需要能够处理加载vue组件,需要webpack的支持

3.后端加入webpack(看图二三四...)
npm install cross-env vue-server-renderer webpack-node-externals lodash.merge --save

(1)webpack配置文件中,重点了解Target_node变量的来源,在entry出口文件打包时会根据这个变量判断
(2)server.js配置文件中,vsr获取createBundleRenderer打包渲染器,
渲染器参数clientManifest(客户端清单-->通过访问的页面,对比清单中相对应的文件,进行渲染输出);
renderToString(),通过传入的上下文拿到url,通过清单找到对应的组件进行渲染(客户端打开url能够拿到页面返回前端(首屏原理))

自我总结:客户端发送请求,后台拦截去服务器的ssr项目中根据路由,组合页面将完成的页面返回给客户端的前端进行显示

(3)脚本配置:cross-env设置环境变量,适合各种操作系统.build打出来两个包
  生成的文件会包含所有解析过的完成的页面及加载好的脚本文件,客户端直接访问的是一个单独的首屏的ssr文件,而加载的
  脚本中包含了我们后期使用的路由等已经打包好的文件,不影响后期的使用.
  
ssr:只有 beforeCreate和 created 会在服务器端渲染(SSR)过程中被调用
解决方案：
（1）在beforeCreate，created生命周期以及全局的执行环境中调用特定的api前需要判断执行环境；
（2）使用adapter模式，写一套adapter兼容不同环境的api。

fetch:前后台都会走

