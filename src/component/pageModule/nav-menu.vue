<template>
  <div class="nav-content" v-if="navRouter&&navRouter.length">
    <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
      <!--<el-radio-button :label="false">展开</el-radio-button>-->
      <!--<el-radio-button :label="true">收起</el-radio-button>-->
    <!--</el-radio-group>-->
    <el-menu class="el-menu-vertical-demo" :default-active="activeRouter" @open="handleOpen" @close="handleClose"
             :unique-opened="true"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <div v-for="menu in navRouter" :key="menu.id">
        <el-submenu v-if="menu.children&&menu.children.length" :index="menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
          <el-menu-item-group v-if="menu.children&&menu.children.length">
            <div v-for="child in menu.children" :key="child.id">
              <el-menu-item v-if="!child.children||!child.children.length" :index="child.id" @click="pathRoute(child)">
                {{child.name}}
              </el-menu-item>
              <el-submenu v-if="child.children&&child.children.length" :index="child.id">
                <span slot="title">{{child.name}}</span>
                <el-menu-item v-for="submenu in child.children"
                              :index="submenu.id"
                              :key="submenu.id"
                              @click="pathRoute(submenu)"
                >{{submenu.name}}</el-menu-item>
              </el-submenu>
            </div>
          </el-menu-item-group>
      </el-submenu>
        <el-menu-item v-if="!menu.children||!menu.children.length"
                      @click="pathRoute(menu)"
                      :index="menu.id">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        activeRouter: "",
        navRouter: [],
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      pathRoute(option) {
        this.activeRouter = option.id;
        this.$router.push({path: option.url})
      },
      findRoute() {
        let onRoute = window.location.href;
        let result = null;

        const findMark=(route,list)=>{
          list.filter(item=> {
               if(item.children){
                  findMark(route,item.children)
              }else{
                 if (onRoute&&onRoute.indexOf(item.url) !== -1){
                   console.log('item',item);
                   result = item;
                 }
              }
            });
        };

       findMark(onRoute,this.navRouter);

        console.log('result',result);
        this.activeRouter = result ? result.id : '1-1';
      }
    },
    mounted() {
      this.navRouter = [
        {
          id:'1',
          name:'首页',
          icon:"el-icon-location",
          url:'',
          children:[
            {
              id: '1-1',
              name: '商品列表',
              url: '/list',
            },
            {
              id: '1-2',
              name: '购物车',
              url: '/shopping'
            },
          ]
        },
        {
          id:'2',
          name:'组件使用',
          url:'',
          icon:"el-icon-location",
          children:[
            {
              id: '2-1',
              name: 'element组件使用',
              url: '/element-first'
            },
            {
              id: '2-2',
              name: '自定义element组件',
              url: '',
              children:[
                {
                  id:'2-2-1',
                  name:'菜单测试',
                  url:'/element-myself'
                }
              ]
            },
          ]
        },
        {
          id: '3',
          name: '登录',
          icon:'el-icon-document',
          url: '/login'
        },
        {
          id:'4',
          icon:'el-icon-setting',
          name:'大文件上传',
          url:'/fileUpload'
        }
      // {
      //   id: '7',
      //   name: '复合视图（匿名视图）',
      //   url: '/recombination'
      // },
      // {
      //   id: '8',
      //   name: '父子路由（匿名视图）',
      //   url: '/nest'
      // }
      ];
      this.findRoute();
    },
  }
</script>

<style>
  .nav-content{
    height: calc(100vh - 50px);
    background-color:#545c64;
  }
</style>
