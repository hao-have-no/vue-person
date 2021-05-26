import workService from '../service/work-bench';

export default {
  state:{
    flowList:[]
  },
  actions:{
    getFlow({state,commit}){
      workService.getFLowList().then(flowList=>{
        commit('setFLowList',flowList);
      })
    }
  },
  mutations:{
    setFLowList(state,{flowList}){
      state.flowList = flowList;
    }
  },
  getters:{
    flowList:state=>{
      if (state.flowList.length){
        state.flowList[0]['finishedCount'] = state.flowList.reduce((total,item)=>total+item['finishedCount'],0)
        state.flowList[0]['totalCount'] = state.flowList.reduce((total,item)=>total+item['totalCount'],0)
        return state.flowList;
      }
    }
  }
}
