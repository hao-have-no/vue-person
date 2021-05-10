<template>
  <div>
    <el-page-header @back="goBack" content="用户列表">
    </el-page-header>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户ID">
        <el-input v-model="formInline.user" debounce="1000" @input="searchSubmit" placeholder="用户ID"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="formInline.region" placeholder="活动区域" @change="searchSubmit">
          <el-option label="个人用户" value="person"></el-option>
          <el-option label="公司用户" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
  </el-form>

    <!--<div id="asset">-->
      <!--<p>-->
        <!--<keep-alive :exclude="excludeName">-->
          <!--<ContentDetail v-if="view" msg="Welcome to Your Vue.js App"/>-->
        <!--</keep-alive>-->
      <!--</p>-->
      <!--{{message}}-->
      <!--<button @click="change">控制子组件显示隐藏</button>&nbsp;-->
      <!--<button @click="changeexclude">控制子组件是否使用keep-alive,默认使用</button>-->
    <!--</div>-->

    <!--列表-->
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--border-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--prop="date"-->
        <!--label="用户名"-->
        <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="name"-->
        <!--label="姓名"-->
        <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="address"-->
        <!--label="性别">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="address"-->
        <!--label="年龄">-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </div>
</template>

<script>
  import ContentDetail from './detail';
    export default {
        name: "list",
      components:{ContentDetail},
      data() {
        return {
          formInline: {
            user: '',
            region: ''
          },
          tableHeader:[],
          message : "Welcome wuyou",
          view:true,
          excludeName:''
        }
      },
      methods: {

      // vue生命周期，父before create, create ,beforeMounted  子before create, create ,beforeMounted mounted 父 mounted
      //   onSubmit() {
      //     console.log('submit!',this.formInline);
      //   },
      //   goBack(){
      //     console.log('back')
      //   },
      //   searchSubmit(){
      //     console.log('search',this.formInline)
      //   },
      //   change(){
      //     this.message = '修改过后的数据';
      //     this.view = !this.view;
      //   },
      //   changeexclude(){
      //     this.excludeName = 'contentDetail';
      //   }
      // },
      // beforeCreate: function () {
      //   console.group('beforeCreate ');
      //   console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      //   console.log("%c%s", "color:red","data   : " + this.$data); //undefined
      //   console.log("%c%s", "color:red","message: " + this.message);//undefined
      // },
      // created: function () {
      //   console.group('created ');
      //   console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      //   console.log("%c%s", "color:green","data   : " + this.$data); //[object Object]  =>  已被初始化
      //   console.log("%c%s", "color:green","message: " + this.message); //Welcome wuyou  =>  已被初始化
      // },
      // beforeMount: function () {
      //   console.group('beforeMount');
      //   console.log("%c%s", "color:green","el     : " + (this.$el)); //undefined
      //   console.log("%c%s", "color:green","data   : " + this.$data); //已被初始化
      //   console.log("%c%s", "color:green","message: " + this.message); //已被初始化
      // },
      // mounted: function () {
      //   console.group('mounted');
      //   console.log("%c%s", "color:green","el     : " + this.$el); //已被初始化
      //   console.log(this.$el);
      //   console.log("%c%s", "color:green","data   : " + this.$data); //已被初始化
      //   console.log("%c%s", "color:green","message: " + this.message); //已被初始化
      // },
      // beforeUpdate: function () {
      //   console.group('beforeUpdate');
      //   console.log("%c%s", "color:green","el     : " + this.$el);
      //   console.log(this.$el);
      //   console.log("%c%s", "color:green","data   : " + this.$data);
      //   let message = this.message;
      //   console.log("%c%s", "color:green","message: " + message);
      // },
      // updated: function () {
      //   console.group('updated');
      //   console.log("%c%s", "color:green","el     : " + this.$el);
      //   console.log(this.$el);
      //   console.log("%c%s", "color:green","data   : " + this.$data);
      //   console.log("%c%s", "color:green","message: " + this.message);
      // },
      // beforeDestroy: function () {
      //   console.group('beforeDestroy');
      //   console.log("%c%s", "color:red","el     : " + this.$el);
      //   console.log(this.$el);
      //   console.log("%c%s", "color:red","data   : " + this.$data);
      //   console.log("%c%s", "color:red","message: " + this.message);
      // },
      // destroyed: function () {
      //   console.group('destroyed');
      //   console.log("%c%s", "color:red","el     : " + this.$el);
      //   console.log(this.$el);
      //   console.log("%c%s", "color:red","data   : " + this.$data);
      //   console.log("%c%s", "color:red","message: " + this.message)
      }
    }
</script>

<style scoped>

</style>
