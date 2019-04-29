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
