export default {
  state:{
    cart: []
  },
  mutations:{
    addcart(state,item){
      const good=state.cart.find(v => v.title === item.title);
      if (good){
        good.cartCount +=1;
      } else{
        state.cart.push({
          ...item,
          cartCount:1
        })
      }
    },
    cartremove(state,index){
      if (state.cart[index].cartCount > 1){
        state.cart[index].cartCount -=1;
      }else{
        state.cart.splice(index,1);
      }
    },
    cartadd(state,index){
      state.cart[index].cartCount +=1;
    },
    settlecart(state,modal){

    }
  },
  getters:{
    cartTotal:state=>{
      //商品总数
      let num=0;
      state.cart.forEach(v=>{
        num+=v.cartCount;
      })
      return num;
    },
    total:state=> {
      return state.cart.reduce(
        //reduce常见参数(累加值(第一次为0),当前待计算项)
        (total, item) => total + item.cartCount * item.price
        , 0)
    }
  }

}
