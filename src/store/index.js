import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import {getLanguage} from "../lang/index";
import router from '../router/index'
import api from "../axios/api"

Vue.use(Vuex);


export default new Vuex.Store({
  namespace:true,
  state:{
    language:getLanguage,
    login:false
  },
  mutations:{
    SET_LANGUAGE:(state,language)=>{
      state.language=language;
      Cookies.set("language",language);
    },
    changeLogin:(state,{result})=>{
      state.login=result;
    }
  },
  actions:{
    setLanguage({commit},language){
      commit("SET_LANGUAGE",language);
    },
    async checkMe({commit}){
      //请求／ｍｅ接口，对登录信息进行判断，并保留状态
      const url=api.getMe();
      const result=await Vue.prototype.$http.get(url).then(data =>data.data);
      console.log(result);
      if (!result){
          router.push({name:'login'})
      }
      commit('changeLogin',{result})
    }
  }
});
