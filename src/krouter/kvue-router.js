
//结构看实际应用，先注册，创建VueRouter实例，最后导出实例并挂载到vue实例上

//引入传入的构造函数
let Vue;
//因为传入的_Vue会在class类中使用，而作为插件的话，减少之间的偶尔
//防止打包的时候将vue的实例打包导致体积变大


//VueRouter类（放置具体的声明）
//new VueRouter(routers) //routers路由队列
class VueRouter{
  constructor(options){
    //优化－缓存path和router的关系
    this.routeMap={};

    this.$options = options;//保存选项备用

    this.$options.routers.forEach(route=>{
      this.routeMap[route.path] = route;
    });

    //创建current保存当前的url
    // this.current  = '';
    //为了让使用current的组件重新渲染
    //必须使current具有响应式特性
    //Vue.util.defineReactive:指定对象中的某个属性，让它具有响应式
    //所有使用它的组件会都随着改变
    Vue.util.defineReactive(this,'current','/');
    //使用后，每次改变都会触发router-link,router-view的更新

    //但是出现嵌套路由后，这种方法就不太合适了
    //现在采用

    // this.current = window.location.hash.slice(1)||'/';
    // Vue.util.defineReactive(this,'matched',[]);

    //match遍历路由表，获得匹配关系
    // this.match();


    //监听hashchange
    window.addEventListener('hashchange',this.onHashChange.bind(this));
    //this指向不明确，如果按照这方式，最终会更改window.current
    //bind更改当前ｔｈｉｓ指向
  }

  onHashChange(){
    this.current = window.location.hash.slice(1);
    console.log(this.current);
  }

  match(){
    // routers = routers
  }
}


//实现静态的install方法或者install方法
//参数1是固定的,Vue的构造函数,vue.use(VueRouter),use其实执行的是install方法,相当于把vue的实例传入进来
//以插件的形式，实现对vue-router的使用
VueRouter.install=function (_Vue) {
    Vue = _Vue;

    //挂载VueRouter实例
    //通过this.$options.router:因为router作为选项传入了Vue的实例中(main.js里有体现),但是传入到Vue实例的选项，这个实例在new完才会存在,现在拿不到

    //通过全局的混入，通过生命周期，拿到实例中的指定内容
     Vue.mixin({
       beforeCreate() {
          //该生命周期会在所有组件的创建时
         //只有在生命周期中才能拿到组价的实例

         //在当前的上下文，已经是组件实例了．this可以代表组件的根实例了

         //new Vue是根实例(因为new Vue只会实例化一次)，app是根组件
         //补充，为啥能拿到路由器实例,new Vue的时候传了一个对象，
         // 把该对象记为options，Vue将options中自定义的属性和Vue构造函数中定义的属性合并为vm.$options
         //this指向Vue实例的时候，可以拿到传入进去的router
          if (this.$options.router){
            Vue.prototype.$router = this.$options.router;//拿到路由器实例
            //为什么要拿router实例？this.$router.push做跳转的时候，应该是拿到了ｖｕｅ实例，在这就是为了挂载，方便其他人调用
            console.log('krouter init',this);
          }
       }
     });

    //2.注册两个组件
    Vue.component('router-view',{
      render(h) {
        //如何访问路由器实例
        // this.$router(因为上边已经挂载了路由器的实例),原型数据共享
        //在curretn具有响应性后，将组件拿出来放入render函数中

        //开始进行嵌套路由的判断
        // 1.router-view深度标识
        //2. 路由匹配时
        // this.$vnode.data.routerView = true;
        //
        // let depth = 0;
        // let parent = this.$parent;
        //
        // while (parent){
        //   const vnodeData = parent.$vnode && parent.$vnode.data;
        //   if (vnodeData){
        //     if (vnodeData.routerView){
        //       depth++;
        //     }
        //   }
        //   parent = this.$parent;
        // }



        console.log('router-view render',this.$router.current);//$router是路由器的实例

        // let component = null;
        // const {$options, current} = this.$router;
        // const route = $options.routers.find(route=>route.path === current);
        // //可以看一下router中index文件中的声明,new Router的时候会传入router路由队列,并且挂载到了vue实例上
        // if (route){
        //   component = route.component;
        // }

        //优化－routeMap已经记录关系current和route选项的关系,直接提取就行
        const {routeMap,current} = this.$router;
        const component = routeMap[current]?routeMap[current].component:null;
        // return h('div','router-view:nothing to show')
        return h(component);
      }
    });

    //router-link to='/'>xxxx
    Vue.component('router-link',{
      props:{
        to:{
          type:String,
          default:''
        }
      },
    render(h) {
        console.log('router-link',this.to);
        //更为通用的写法
        return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)
        //ｊｓｘ
      // return <a href={'#'+this.to}>{this.$slots.default}</a>
    }
  });
};

export default VueRouter;
