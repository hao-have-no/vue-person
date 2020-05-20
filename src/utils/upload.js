const baseUrl = '';

export function request({
  url,
  method = "post",
  data,
  onProgress = e => e,
  headers = {},
  requestList
}){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.upload = onProgress;
    xhr.open(method,baseUrl+url);
    Object.keys(headers).forEach(key=>{
      xhr.setRequestHeader(key,headers[key])
    });

    xhr.onreadystatechange=e=>{
      if(xhr.readyState === 4) {
        if(xhr.status === 200){
          if(requestList){
            // 删除碎片列表
            const i = requestList.findIndex(req=>req===xhr)
            requestList.splice(i, 1)
          }
          resolve({
            data: e.target.response
          });
        }else if(xhr.status === 500){
          reject('报错了 大哥')
        }
      }
    };

    requestList?.push(xhr);

    xhr.send(data);
  })

  export async function post(url,data){
    let ret = await request({
      url,
      data:JSON.stringify(data),
      headers:{
        "content-type":"application/json"
      }
    });
    return JSON.parse(ret.data);
  }


}
