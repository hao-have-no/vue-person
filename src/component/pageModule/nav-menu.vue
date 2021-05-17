<template>
  <div class="nav-content" v-if="navRouter&&navRouter.length">
    <el-menu class="el-menu-vertical-demo" :default-active="activeRouter"
             :unique-opened="true"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
    >
        <template v-for="menu in navRouter">
          <el-submenu v-if="menu.children&&menu.children.length" :index="menu.id" :key="menu.id">
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
                        :key="menu.id"
                        :index="menu.id">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
      </template>
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
          return list.filter(item=> {
               if(item.children){
                  findMark(route,item.children)
              }else{
                 if (onRoute&&onRoute.indexOf(item.url) !== -1){
                   console.log('item',item);
                   result = item;
                   return item;
                 }
              }
            });
        };

       const res = findMark(onRoute,this.navRouter);

        console.log('result',result,res);
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
          id:'7',
          name:'用户管理',
          icon:"el-icon-location",
          url:'',
          children:[
            {
              id: '7-1',
              name: '用户列表',
              url: '/user-list'
            },
          ]
        },
        {
          id:'2',
          name:'组件使用',
          url:'',
          icon:"el-icon-menu",
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
      this.$bus.$on('update-status',(val)=>{
          this.$nextTick(()=>{
            this.isCollapse = val;
          });
      })
    },
  }
</script>

<style>
  .nav-content{
    height: calc(100vh - 50px);
    background-color:#545c64;
  }
</style>
