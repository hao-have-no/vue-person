import axios from "axios";
import qs from "qs";
import url from 'url'
import router from '../router/index'

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
  if (localStorage.getItem('ctoken')){
    config.headers['ctoken'] = localStorage.getItem('ctoken')
  }
  return config;
},error => {
  Promise.reject(error);
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

    if (error.response.status == 404){
      const pathname=url.parse(error.config.url).pathname;
      console.log("lanjie")
      return {
        data:pathname
      }
    }else if(error.response.status == 403){
      router.push({
         name:'login'
       })
    }else if (error.response.status == 504){
      const pathname=url.parse(error.config.url).pathname;
      var data={
        result:pathname,
        mes:'地址错误'
      }
      return data;
    }else{
    console.log('error');
    return Promise.reject(error)
    }
  }
);

export default service;
