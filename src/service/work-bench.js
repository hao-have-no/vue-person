import service from '../axios/service/v5-request'
import vue from '../main.js';

export default {
  //获取任务tab
  getFLowList(params){
    const {searchDate} = params||'1';
    return vue.$http.get(service.getFlowList(searchDate)).then(res=>{
      const {code,data:flowList} = res.data;
       if (code){
         return {flowList}
       }else{
         return null;
       }
    });
  },

}
