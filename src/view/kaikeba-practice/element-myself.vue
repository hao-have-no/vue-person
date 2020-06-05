<template>
    <div>
      <!--模仿element实现el-form,el-form-item,el-input

          三层设计：
          form: 1.指定数据modal和校验规则 2.校验validate(）  只做数据的传到和总体把控
          form-item: 1.label显示字段名 2.prop:属性名，及校验的子弹 3.执行校验规则  4.显示错误信息   实现具体的操作落地
          form-input: 1.维护数据v-modal 2.图标，反馈



          import:input怎么拿到form的数据模型（因为是三层嵌套），推荐使用provide(app.vue)和inject，服务提供与注入

          provider:父级提供元素
          inject:自己元素通过该方法注入当前元素
      -->
        <myself-form :model="model" :rules="rules" ref="form">
          <!--form-item:
            执行校验，显示
          -->
          <myself-form-item label="用户名" prop="username">
          <!--arguments表示参数对象-->
            <!--事件监听@input，和属性绑定:value-->
          <!--<myself-input :value="value" @input="value = arguments[0]"></myself-input>-->
              <myself-input v-model="model.username"></myself-input>
          </myself-form-item>
          <myself-form-item label="密码" prop="password">
            <!--input组件常用的属性直接抽离出来，作为参数传入-->
            <myself-input v-model="model.password" type="password"></myself-input>
          </myself-form-item>
          <myself-form-item >
            <button @click="login">登录</button>
          </myself-form-item >
      </myself-form>
      {{model}}

      <!--<button @click="submitForm">登录</button>-->
    </div>
</template>

<script>
  /**总结：
   * 1.vue-核心api
   * 2.element表单的实现（1.双向绑定  2.slot插槽  3.第三方插件（validate使用））
   * 3.
   */
    import MyselfInput from '../../component/element-self/selfInput'
    import MyselfFormItem from '../../component/element-self/selfFormItem'
    import MyselfForm from '../../component/element-self/selfForm'

    // import create from '../utils/create'
    // import Notice from '../../component/Notice'

    export default {
        name: "element-practice",
        data(){
          return {
            model:{
              username:"",
              password:""
            },
            rules:{
              username:[{required:true,message:"请输入用户名"},{min:6,max:10,message:"请输入6-10的用户名"}],
              password:[{required:true,message:"请输入密码"}]
            }
          }
        },
      methods:{
          login:function () {
            this.$refs.form.validate(valid=>{
            //   if (valid){
            //     console.log("请先登录");
            //   } else{
            //     console.log("校验失败");
            //   }
            //   create(Notice,{
            //     title:'校验结果',
            //     message:valid?'请求登录':'校验失败',
            //     duration:1000
            //   }).show(); //创建组件实例并显示

            //进阶，将创建实例化的放入main.js
                this.$notice({
                  title:'校验结果',
                  message:valid?'请求登录':'校验失败',
                  duration:1000
                }).show();
            })
          },

      },
      components:{
        MyselfInput,
        MyselfFormItem,
        MyselfForm
      }
    }
</script>

<style scoped>

</style>
