import axios from "axios";
import qs from "qs";
import app from "../main";

/**
 创建ａｘｉｏｓ实例
*/
const service =axios.create({
  baseURL:process.env.BASE_URL,
  timeout:5000
});

/*request拦截器*/
service.interceptors.request.use(config=>{
  config.method === 'post'?config.data=qs.stringfy({...config.data}):config.params={...config.data};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
},error => {
  Promise.reject(error);
})
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
    if (response.data.result === 'TRUE') {
      return response.data;
    } else {
      return Promise.reject("请求错误");
    }
  },
  error => {  //响应错误处理
    console.log('error');
    console.log(error);
    console.log(JSON.stringify(error));

    return Promise.reject(error)
  }
);

export default service;
