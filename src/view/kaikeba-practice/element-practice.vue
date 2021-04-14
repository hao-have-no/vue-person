<template>
    <div>
        <div>
          <h3>Element表单</h3>
          <hr>
          <el-form :model="model" :rules="rules" ref="loginForm">
             <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" autocomplete="off"></el-input>
             </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="model.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <h3>异步组件/keep-alive</h3>
          <el-button v-for="tab in tabsEnum" :key="tab" @click="currentTab = tab" :class="['tab-button',{active:currentTab === tab}]">{{tab}}</el-button>
          <keep-alive>
              <component :is="currentComponent"></component>
          </keep-alive>
        </div>
      <div>
        <h3>nextTicks</h3>
        <span ref="articles" @click="getAllTabs()">{{testMsg}}</span>
      </div>
    </div>
</template>

<script>
    import KeepTitle from "./keep-alive/keep-title";
    import KeepContent from "./keep-alive/keep-content";
    export default {
        name: "element-practice",
      components: {KeepTitle,KeepContent},
      data(){
          return {
            model:{
              username:"",
              password:""
            },
            rules:{
              username:[{required:true,message:"请输入用户名"}],
              password:[{required:true,message:"请输入密码"}]
            },
            currentTab:'Title',
            tabsEnum:['Title','Content'],
            testMsg:"init"
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
          getAllTabs:function(){
            let that=this;
            that.testMsg="修改后的值";
            console.log(this.$refs.articles.innerText);
          }
      },
      computed:{
          currentComponent(){
            return `keep-${this.currentTab.toLowerCase()}`
          }
      },
    }
</script>

<style scoped>
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .active{
    color:#039be5;
    font-size: 18px;
    font-weight: bold;
  }
</style>
