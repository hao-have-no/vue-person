import us from '../service/user';

export default{
  state:{
    isLogin:!!localStorage.getItem('token')
  },
  mutations:{
    setLoginState:(state,b)=>{
      state.isLogin = b;
    }
  },
  actions:{
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
  }
}
