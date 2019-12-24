import Vue from "vue";
import Vuex from "vuex";
import {getLanguage} from "../lang/index";
import { mapActions } from 'vuex';
import user from './users'
import goods from './goods'
import cart from './carts'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
    goods,
    cart
  },
  // namespace:true,
  state:{
    // 相关变量
    // language:getLanguage,
    // login:false
    // count: 5,
    isLogin:localStorage.getItem('token')?true:false
  },
  mutations:{
  //   //操作方法（具体的外部请求处理方法）
  //   // SET_LANGUAGE:(state,language)=>{
  //   //   state.language=language;
  //   //   Cookies.set("language",language);
  //   // },
  //   // changeLogin:(state,{result})=>{
  //   //   state.login=result;
  //   // }
  //   increment(state){
  //     state.count ++
  //   },
  //   decrement(state){
  //     state.count --
  //   },
  //   setLoginState(state,b){
  //     state.isLogin = b;
  //   }
  // },
  // actions:{
  //   increment:({commit})=>{
  //     commit('increment');
  //   },
  //   decrement:({commit})=>{
  //     commit('decrement');
  //   },
    login:({commit},user)=>{
      //登录请求,controller
        return new Promise((resolve, reject) =>{
          us.login(user).then(res => {
            if (res.data.data.code === 200) {
              const {code, token} = res.data.data;
                //登陆成功
                commit('setLoginState', true);
                localStorage.setItem('token', token);
              resolve(code);
            }else{
              resolve(res.data.data);
            }
          });
        })
    },

    logout:({commit})=>{
      //清缓存，重置状态
      localStorage.removeItem('token');
      commit('setLoginState', false);
    }
  //
  //   //承接外部请求，进行分发处理
  //
  //   // 语言转化
  //   // setLanguage({commit},language){
  //   //   commit("SET_LANGUAGE",language);
  //   // },
  //
  //   //登录验证
  //   // async checkMe({commit}){
  //   //   var myDate = new Date();
  //   //   var ts=Math.ceil(myDate.getTime()/1000);
  //   //   //请求／ｍｅ接口，对登录信息进行判断，并保留状态
  //   //   const url=api.getMe();
  //   //   const result=await Vue.prototype.$http.get(url).then(data =>data.data);
  //   //   var loginMark=result.data.message[0].ts;
  //   //   let mark=(ts-result.data.message[0].ts) > 3600?false:true;
  //   //   if (!mark){
  //   //       router.push({name:'login'})
  //   //   }
  //   //   commit('changeLogin',{loginMark})
  //   // }
  },
  // //计算属性
  // // getters:{
  // //   count:
  // // }

});
