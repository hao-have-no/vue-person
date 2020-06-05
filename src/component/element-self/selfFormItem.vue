<template>
    <div>
      <label>{{label}}</label>
      <div>
        <slot></slot>
        <p v-if="errStatus">{{errorMessage}}</p>
        <p>{{this.kForm.rules[prop]}}</p>
      </div>
    </div>
</template>

<script>
     import Schema from 'async-validator'

    export default {
        name: "self-form-item",
        componentName:"self-form-item",
        inject:['kForm'],
        props:["label","prop"], //确定要显示的标签，props校验的属性
        //因为具有校验功能，该组件拥有自己的状态，所以data

        data(){
          return{
            errorMessage:"",
            errStatus:false
          }
        },
      mounted(){
        this.$on('validate',this.validator);
      },
        methods:{
         validator(){
           //1.获取校验规则，校验字段
           const rules=this.kForm.rules[this.prop];
           const value=this.kForm.model[this.prop];

           //2.描述对象，[]用于动态计算，将this.prop变为我们想要的key
           //validate固定格式要求（计算属性）
           let descriptor={[this.prop]:rules};
           //3.创建校验器
            let schema=new Schema(descriptor);
            //4.执行校验
            schema.validate({[this.prop]:value},errors=>{
              if (errors){
                  this.errorMessage=errors[0].message;
                  this.errStatus=true;
              } else{
                   this.errorMessage='';
                     this.errStatus='';
              }
            })
         },
          show(){
           console.log(this.prop);
            console.log(this.kForm.modal);
            console.log(this.kForm.rules)
          }
        },
      created() {
        this.show();
      }
    }
</script>

<style scoped>

</style>
