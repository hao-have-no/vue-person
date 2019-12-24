//全局创建组件实例函数u
import Vue from 'vue';

export default function (Compoment,props) {
  //用main的实例,里面带有很多组件
  //所以使用全新的组件,方便使用(只需要编译小球组件)

  //props作为额外的参数,带入实例中
  //创建vue实例
  const instance=new Vue({
      render: h=>{
        //返回的是js对象(虚拟dom),生成的任何数据都会导致render执行
        console.log(h(Compoment,{props}));
        // js对象和界面中的某个节点进行挂钩
        return h(Compoment,{props})
      }
    }).$mount();

  //生成的dom追加至body
  document.body.appendChild(instance.$el);

  //添加销毁
  const comp=instance.$children[0];//拿到节点
  comp.remove=function () {
    document.body.removeChild(instance.$el);
    instance.$destroy();//自我销毁
  }

  return comp;
}
