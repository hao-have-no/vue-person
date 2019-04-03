import axios from 'axios'


//创建实例
let service:any={};
service=axios.create({
  baseURL:process.env.HOST,
  timeout:5000
})

//request拦截器axios的一些配置
service.interceptors.request.use(
  (config:any)=>{
    return config;
  },
  (error:any)=>{
    console.error("error",error);
    Promise.reject(error);
  }
);

export default service;
