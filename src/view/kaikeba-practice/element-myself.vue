<template>
    <div>
      <!--模仿element实现el-form,el-form-item,el-input
          import:input怎么拿到form的数据模型（因为是三层嵌套），推荐使用provide(app.vue)和inject，服务提供与注入

          provider:父级提供元素
          inject:自己元素通过该方法注入当前元素
      -->
        <myself-form :model="model" :rules="rules">
          <myself-form-item label="用户名" prop="username">
          <!--arguments表示参数对象-->
          <!--<myself-input :value="value" @input="value = arguments[0]"></myself-input>-->
              <myself-input v-model="model.username"></myself-input>
          </myself-form-item>
          <myself-form-item label="密码" prop="password">
            <myself-input v-model="model.password" type="password"></myself-input>
          </myself-form-item>
      </myself-form>
      {{model.username}}
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
          submitForm:function (form) {
            this.$refs[form].validate(valid=>{
              if (valid){
                console.log("请先登录");
              } else{
                console.log("校验失败");
              }
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
