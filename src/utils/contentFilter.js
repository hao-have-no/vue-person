import Vue from '../main';

export function contentFix(content){
  return content&&`${content}--fix`
}

export function sendMes(type,mes){
  Vue.$bus.$emit(type,mes);
}

export function breadCrumb(config){
    //当前地址
    let path = Vue.$route.path;
    // 操作，数据，是否是最后一层（穿插业务层级）,是否能返回
    let { opera, data, last, back } = config;
    // 标识
    const breadCrumbMark = 'breadcrumb';

    //判断条件
    if (!opera)opera = 'save';
    if (!data) data = null;
    if (!last) last=false;
    if (!back) back = false;
    if (!back&&opera === 'save'){
      if (!data){
        throw '未找到存储的数据'
      }
      if (!data['title']){
        throw 'title 字段缺失';
      }
    }

    //获取之前的队列
    const breadList = localStorage.getItem(breadCrumbMark);
    let breadcrumbData = [];
    let lastBreadcrumbData = null;
    let lastBreadcrumbIndex = 0;
    if (breadList){
      breadcrumbData = JSON.parse(breadList);
      lastBreadcrumbIndex = breadcrumbData.length-1;
      lastBreadcrumbData = breadcrumbData[lastBreadcrumbIndex];
    }

    //是否能够返回
    if (back){
       breadcrumbData = breadcrumbData.slice(0, lastBreadcrumbIndex)
    }

    //检查当前地址是否在缓存中，有的话删除之后的
    let hasBreadCrumbIndex = breadcrumbData.findIndex(item=>item.url === path);
    if(hasBreadCrumbIndex >= 0)breadcrumbData = breadcrumbData.slice(0,hasBreadCrumbIndex+1);

    if (hasBreadCrumbIndex){
      localStorage.setItem(breadCrumbMark,JSON.stringify(breadcrumbData));
    }

    //判断级别,填充数据
    if (data){
      if (!data.url){
        data.url = path;
      }
      //生成级别
      if (!data.level){
        data.level = last&&lastBreadcrumbData?lastBreadcrumbData.level+1:1;
      }

      let level = data.level;
      breadcrumbData = breadcrumbData.slice(0,level);

      //判断是否是结束的层级
      if (last){
        if (lastBreadcrumbData && lastBreadcrumbData.title === data.title) {
          // 去掉 level 增量
          data.level = data.level - 1;
          breadcrumbData.splice(lastBreadcrumbIndex, 1, data)
        } else {
          breadcrumbData.push(data)
        }
      }else{
        let insertIndex = level - 1;
        if (breadcrumbData.length === insertIndex || breadcrumbData.length > insertIndex) {
          breadcrumbData[insertIndex] = data
        } else {
          breadcrumbData.push(data)
        }
      }
    }

    //操作
    switch (opera) {
      case 'save':
        if (breadcrumbData){
          localStorage.setItem(breadCrumbMark,JSON.stringify(breadcrumbData));
          setTimeout(()=>{
            sendMes('changeBreadCrumb');
          },0)
        }
        break;
      case 'del':
        localStorage.removeItem(breadCrumbMark)
        break;
      default:
        return breadcrumbData;
    }


}
