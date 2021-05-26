<template>
  <div class="panel panel-default border padding-md">
    <el-page-header @back="goBack" content="用户列表">
    </el-page-header>
    <work-bench v-if="flowList.length" @work-status="taskSource" :flow-list="flowList"></work-bench>
    <el-form :inline="true" :model="formInline" class="demo-form-inline text-align-left margin-top-md margin-left-sm">
      <el-form-item label="用户ID">
        <el-input v-model="formInline.user" @input="searchSubmit" placeholder="用户ID"></el-input>
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
    <el-table
      v-if="tableData&&tableData.length"
      :data="tableData"
      :default-sort = "{prop: 'date'}"
      style="width: 100%">
      <el-table-column
        label="日期"
        prop="date"
        sortable
       >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
        <template slot-scope="scope">
            <span>{{scope.row.name |updateName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button size="mini" type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex';
  import WorkBench from '../../component/work-bench/bench-list.vue';
    export default{
        name: "UserList",
      data() {
        return {
          formInline: {
            user: '',
            region: ''
          },
          tableHeader:[],
          message : "Welcome wuyou",
          view:true,
          excludeName:'',
          tableData:[],
          paramList:[
            {label:'姓名',type:'text',value:"name",list:[]},
            {label:'日期',type:'date',value:"time",list:[]},
            {label:'会员类型',type:'select',value:"goodType",list:[]},
            {label:'任务类型',type:'select',value:"taskType",list:[]},
            {label:'业务类型',type:'select',value:"professionType",list:[],valLabel:'desc',val:'code'},
            {label:'任务状态',type:'select',value:"status",list:[],valLabel:'desc',val:'code'},
            {label:'任务来源',type:'select',value:"source",list:[],valLabel:'name',val:'label'}
          ],
          tabStatus:'',
        }
      },

      created(){
        this.tableData = [{
          id:'1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:'2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id:'3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id:'4',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        this.getAllParams()
      },

      mounted(){
        console.log('mounted',this.tableData)
      },

      methods: {
        ...mapActions(['getFlow','getFilterEnumerate']),
        getAllParams(){
          this.getFlow();
          // this.getFilterEnumerate(); //获取筛选项枚举,
          // this.initSearchParams();
          // this.taskSource();
        },
        initSearchParams(){
          this.patiState = "fetching";
          //工作台列表
          this.tableData = [];

          this.jumpPage = ""; //跳转页面
          //tab-医生工作台
          this.tabStatus='';
          this.searchParams={
            name:'',
            time:'',
            goodType:'',
            taskType:'',
            status:'',
            createTime:'',
            endTime:'',
            professionType:'',
            source:''
          };
          this.paramList[5]['list'] = [];
        },
        taskSource(data){
          console.log(data);

        },//获取任务来源
        soreAddress(row, column){
          console.log('soreAddress',row)
          return `${row.address}234`;
        },

        handleEdit(index, row) {
          const path = `user-detail/${row.id}`;
          this.$router.push(path)
        },

        handleDelete(index,row){
          this.tableData = this.tableData.filter(item=>item.id !== row.id)
        },

      // vue生命周期，父before create, create ,beforeMounted  子before create, create ,beforeMounted mounted 父 mounted
        onSubmit() {
          console.log('submit!',this.formInline);
        },
        goBack(){
          console.log('back')
        },
        searchSubmit(){
          console.log('search',this.formInline)
        },
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
      },

      computed:{
        ...mapGetters(['flowList'])
      },

      components:{
        WorkBench
      }
    }
</script>
