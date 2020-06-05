

<script>
    export default {
      name: "heading",
      //2. functional:true, //函数式组件
      //
      // //函数式组件，无状态，无生命周期，无监听，没有响应
      //
      // props:{},
      // render(h, context) {
      //     //所有参数没有this,参数必须通过上下文获取
      //     //context.xx
      //   //详细用法参考官方文档
      // }

      //1.通过render函数渲染模版
      props:{
        level:{
          type:String,
          required:true
        },
        title:{
          //是一个特性
          type:String,
          default:''
        },
        icon:String
      },
      render(h) {
        //构造子元素
        let children = [];

        //icon的判断逻辑
        if (this.icon){
          //svg<use:href="#icon-cart"
          children.push(
            h(
              'svg',//节点名称
              {class:'icon'},
              [h('use',{attrs:{'xlink:href':'#icon-'+this.icon}})]//子元素的数组
          ))
        }

        //拼接孩子节点
        children = children.concat(this.$slots.default);　//两部分：默认插槽部分和我们勾画的svg部分

        const vNode = h('h'+this.level, //参数１:tagName
          {attrs:{title:this.title}}, //参数2,传参
          // this.$slots.default //参数3,子节点的Vnode数组
          children //进阶：子节点的Vnode数组包含用户传入部分和我们自己勾画的部分
        );

        console.log('vNode',vNode);
          //虚拟dom是什么
          //通过属性来表述节点内容,Vnode是一个节点树，将vnode通过算法转化为真实的ｄｏｍ（ＤＩＦＦ算法的实际体现）


        console.log(this.$slots.default);

        //snabbdom
        //h 其实为高阶函数createElement  用于创建虚拟DOM(vnode)
        // render:function(createElement){return createElement(tag标签名称,data　传递的数据,children　子节点数组)}
        //<heading level='1'　:title='title' icon='card'></heading>   渲染为  <h2></h2>

        //返回createElment产生的vnode

        return vNode;
      }
    }
</script>

<style scoped>

</style>
