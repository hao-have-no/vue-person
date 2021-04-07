// mini-vue
//响应式  reactivity

import {reactive,ref,effect} from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js';

//vue3

//依赖收集
// const a = ref(10);
// let b;
// //computed 响应收集
// //effect 匿名函数 触发依赖操作
// //
// effect(()=>{
//   //a.value-->get-->收集 effect(作为a 响应式的依赖)执行-->a.value-->变更触发set, effect执行
//   b = a.value + 10;
//   console.log(new Date().getTime(),a.value);
// });
// a.value  = 20; 

//依赖收集,数据驱动-->视图更新
// const a = ref(10);
// window.a = a;
// const view=()=>{
// document.querySelector('#app').textContent = ``;
// const div = document.createElement('div');
// div.textContent = "heihei mini vue-->"+a.value;
// console.log(a.value);
// document.querySelector('#app').append(div);
// };

// effect(()=>{
//   view();
// })


// const App = {
//   // template--> render函数
//   render(context){
//     effect(()=>{
//       //性能问题(dom频繁删除)－－＞　ｄｉｆｆ算法
//       ////通用流程-->抽离
//       document.querySelector('#app').textContent = ``;
//       const div = document.createElement('div');
//       div.textContent = "heihei mini vue-->"+context.a.value;
//       // console.log(a.value);
//       document.querySelector('#app').append(div);
//     });
//   },
//   setup(){
//     const a = ref(10);
//     window.a = a;
//     return {a}
//   }
// }

// App.render(App.setup());


import {createApp} from './core/index.js'
import {App} from './App.js'

//App 用户需要给的值，包括数据，操作等
//

//createApp(App) 返回根节点对象
// 根节点对象挂载，数据转为视图
createApp(App).mount(document.querySelector('#app'));

//每次更新都是对dom的整体删除增加，效率太低，增加中间层来完成整个ｄｏｍ更新的计算,diff
