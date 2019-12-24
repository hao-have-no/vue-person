import api from '../axios/api';
import vue from '../main.js';

export default {
  getGoodsInfo(){
    return vue.$http.get(api.getGoods()).then(res=>{
      const {code,data:goodsInfo,slider,keys} = res.data;
      //整理数据格式
      if (code === 200){
        return {goodsInfo,slider,keys}
      }else{
        return null;
      }
    });
  }
}
