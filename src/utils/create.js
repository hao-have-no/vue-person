import Vue from 'vue'

//一：以create函数的方式进行使用
//最后挂载到Vue实例上

// 实现一个create方法，能够创建指定组件实例
//并将其挂载至body上

//XX.vue最后是什么？ 最后导出的是组件的配置对象,它是普通的js对象

//Component是组件配置对象
export default function create(Component,props) {
//   //怎么创建组件实例
//
//   //方案一： 通过Vue.extend(Component)获取组件的构造函数
//
  const Ctor = Vue.extend(Component);
  const comp = new Ctor({propsData:props}); //创建组件实例

  comp.$mount();

  // 可以手动追加dom插入body里

  document.body.append(comp.$el);
//
//   //方案二：借助Vue构造组件实例
//
//   // const vm =new Vue({
//   //   render(h){
//   //     //h：createElement的构造方法，返回vdom
//   //     return h(Component,props);
//   //   }
//   // }).$mount(); //获取vm实例，但是不是组件的实例
//
//   //.$mount('body') 会吧已经渲染的全部替换
//
//   //$mount  vdom-->dom
//
//   //vm.$el 获取获取实例的dom结构
//
//   //可以手动追加dom插入body里
//   // document.body.append(vm.$el);
//
//
//
  //需要删除操作，将追加的项目全删了
  comp.remove=()=>{
    document.body.removeChild(comp.$el);
    comp.$destroy();//先销毁自己，销毁实例
  };

  return comp  //返回组件的实例
}


//２：使用插件的方式
// import Notice from '../component/Notice';
//
// export default {
//   install(Vue){
//     Vue.prototype.create = function (option) {
//       return create(Notice,option);
//     }
//   }
// }

// Vue.use(create) 就可以以插件的形式使用create方法
