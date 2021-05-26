const host=process.env.API_ROOT;
const path=host+"/record";

export default {
    getFlowList(searchDate='1'){
      return path+'/flow-list/'+searchDate
    }
}
