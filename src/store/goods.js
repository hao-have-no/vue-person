import gs from '../service/goods'

//每一部分的store都是独立部署,但是之间的数据是共享的
export default {
  state:{
    slider:[],
    keys:[],
    goodsInfo:{}
  },
  actions:{//controller
    getGood({state,commit}){
      if (!state.keys.length){
          gs.getGoodsInfo().then(goodsInfo=>{
            commit('setGoodsInfo',goodsInfo);
          })
      }
    }
  },
  mutations:{//数据处理部分,更改属性状态的操作全在这里处理
    //必须在action中调用才能出发
    setGoodsInfo(state,{slider,keys,goodsInfo}){
      state.goodsInfo = goodsInfo;
        state.keys = keys;
        state.slider = slider;
    }
  },
  getters:{
    //从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
    goods:state=>{
      return state.keys.map(key => state.goodsInfo[key]).reduce((prev,next)=> prev.concat(next),[]);
    }
  }
}
