const host="http://192.168.1.13:12138";
const path=host+"/record";

export default{
  root:path,
  //用户相关接口
  JwtTokenUrl(token,appid){
    return path+'/jwt/auth'+'/'+token+'/'+appid
  },
  getUserList(){
    return path+'/select'
  },
  getUserMes(){
    return path+'/'
  },
  getMe(){
    return path+'/me'
  },
  getLogin(){
    return path+'/login'
  },
  getLogout(){
    return path+'/logout'
  },

  //获取轮播图和列表信息
  getGoods(){
    return path+'/slider'
  }
}
