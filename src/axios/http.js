import axios from "axios";
import qs from "qs";
import url from 'url'
import router from '../router/index'
import main from '../main'

//axios withcredentials：请求携带cookies信息的参数

/**
 创建ａｘｉｏｓ实例
*/
const service =axios.create({
  baseURL:'/api',
  timeout:5000
});

/*request拦截器*/
service.interceptors.request.use(config=>{
  config.method === 'post'?config.data=qs.stringify({...config.data}):config.params={...config.data};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (localStorage.getItem('token')){
    config.headers['token'] = localStorage.getItem('token')
    //结合当代标准，重新定义符合后台规范的令牌
    // config.headers['Authorization'] = 'Bearer' + localStorage.getItem('token');
  }
  return config;
},error => {
  return Promise.reject(error);
})
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
    if (response.status == 'true'　|| response.status == '200') {
      return response;
    } else {
      return Promise.reject("请求错误");
    }
  },
  error => {  //响应错误处理
    if(error.response.status === 401){
      //清空vuex和localStorng(代表着令牌失效和登录错误)，应该重置登录状态
      main.$store.dispatch('logout');
      //跳转登录界面
      main.$router.push("/login");
    }

    if (error.response.status === 404){
      const pathname=url.parse(error.config.url).pathname;
      console.log("连接错误")
      return {
        data:pathname
      }
    }else if(error.response.status === 403){
      router.push({
         name:'login'
       })
    }else if (error.response.status === 504){
      const pathname=url.parse(error.config.url).pathname;
      const mes= {
        result: pathname,
        mes: '地址错误'
      };
        error ={...mes};
    }else{
    console.log('error');
    }
    return Promise.reject(error);
  }
);

export default service;
