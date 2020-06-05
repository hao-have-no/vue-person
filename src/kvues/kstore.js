

//　实现Vuex
// 1.声明Store类
// 2.增加install方法

//主要任务
//1.声明Store类
//   1.1 创建响应式的state，保存选项(state,options,mutation.actions)：因为在调用的时候，$store.add/getters这种方式调用的
//   1.2 实现commit,根据用户传入的type去执行对应的mutation
//   1.3 实现dispath根据用户传入的type寻找对应的action.同时传递上下文
//   1.4 实现getters,按照getters定义对state做派生
//2. 挂载$store


let Vue; //声明全局变量，存储传进来的实例，避免到处调用

class Store{
  constructor(options){

    //借用vue的实例方法来实现响应式（借鸡生蛋）
    //也可以使用Vue.utils.receiveDefine

    //this指向的是Vue的实例,但是不安全
    // this.state = new Vue({
    //   //创建响应式的state
    //   //data中的值都会做响应化处理
    //
    //   //在做代理的情况下，
    //   //通过Store访问state，相当于访问的是vue的实例
    //   //vm.state直接可以调到state的值
    //   data(){
    //     return options.state;
    //       //vue实例上已经有$store了
    //       //使用时为$store.state.xx,
    //   }
    // })

    //定义getters，可以使外部能够访问$store.getters.xx
    this.getters={};
    const getters = options.getters;
    const computed = {};
    Object.keys(getters).forEach(item=>{
      //　构造计算属性的对象
      computed[item] = function () {
        return getters[item](options.state)
      };
      //通过属性劫持，暴露外界节点，只提供只读方法,
      // 当调用的时候直接运行相关方法就行

      //$stores.getters－－＞通过属性绑定，可以进行监听
      Object.defineProperty(this.getters,item,{
        get(){
          return computed[item]();
        }
      })

    });


    //内部变量，希望用户不访问
    //另外不想发生代理，避免问题
    this._vm =new Vue({
        data:{
          $$state:options.state
        },
        computed //通过computed计算属性
    });


    //保存mutation
    this._mutations = options.mutations
    this._actions = options.actions


    const store = this;
    const {commit,dispatch} = store;


    //锁死我们保存的this指向，只指向store
    this.commit = function boundCommit(type,payload){
        commit.call(store,type,payload)
    };
    this.dispatch =function boundDispatch(type,payload){
        dispatch.call(store,type,payload)
    }


    //为什么_vm和$$store不能被访问
    // 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。
    //　
  }

  //js的类声明可以构造器的方式
  //通过get,set方法提供获取和更改方法

  //通过存取器是指成为只读
  get state(){
    return this._vm._data.$$state;
  }

  set state(v){
    console.error('不能改的');
  }

  get getter(){

  }

  //commit修改状态值
  //看一下store/index中的实现
  commit(type,paload){
      const entry = this._mutations[type];
      if (!entry){
        console.error('error');
        return;
      }

      //通过构造器获取state
      //state本身不能赋值，不代表state返回来的对象不能赋值，需要通过方法去弄
      //这个是响应式对象
    //所以使用到这个属性的地方都会render

    //直接调用this有坑,传入的state可能会在函数的内部
      entry(this.state,paload);
  }

  dispatch(type,paload){

    //获取actions
    const entry = this._actions[type];
    if (!entry){
      console.error('没有这个action');
      return;
    }

    entry(this,paload);

  }


}

//模拟Vuex声明的方式　Vuex.Store
//install:是对象的install
//挂载$store
function install(_Vue) {
  Vue = _Vue;

  //挂载store

  //混入，通过生命周期拿到$store的实例并挂载
  Vue.mixin({
    //尽早执行，方便引用
    beforeCreate() {
      //当前的实例上是否有store这个选项
      if (this.$options.store){
        //将挂载到vue实例上的store(main.js中会进行挂载)，将所有选项挂到Vue全局变量上
        Vue.prototype.$store = this.$options.store;
      }
    }
  })

}



//因为使用的时候，是通过new Vuex.Store进行声明
//install是对象的install,不是Store的install
export default {Store,install}
