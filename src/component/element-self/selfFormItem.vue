<template>
    <div>
      <label>{{label}}</label>
      <div>
        <slot></slot>
        <p v-if="">{{errorMessage}}</p>
        <p>{{this.kForm.rules[prop]}}</p>
      </div>
    </div>
</template>

<script>
     import Schema from 'async-validator'

    export default {
        name: "self-form-item",
        inject:['kForm'],
        props:["label","prop"],
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
           const rules=this.kForm.rules[this.prop];
           const value=this.kForm.model[this.prop];

           //描述对象，[]用于动态计算，将this.prop变为我们想要的key
           let descriptor={[this.prop]:rules};
            let schema=new Schema(descriptor);
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
