import api from '../axios/api';
import vue from '../main.js';

export default {
  login(user){
    console.log(api.getLogin());
    return vue.$http.post(api.getLogin(),{params:user})
  }
}
