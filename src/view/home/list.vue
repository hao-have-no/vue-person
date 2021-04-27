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
    <!--列表-->
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="address"
        label="年龄">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "list",
      data() {
        return {
          formInline: {
            user: '',
            region: ''
          },
          tableHeader:[]
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!',this.formInline);
        },
        goBack(){
          console.log('back')
        },
        searchSubmit(){
          console.log('search',this.formInline)
        }
      }
    }
</script>

<style scoped>

</style>
