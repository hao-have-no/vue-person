import { createApp } from "./main"

// 首屏渲染（生成首屏的html），这里代码都在服务端执行
// 创建Vue实例
// 调用者是将来渲染器renderer
export default context => {
  // 为了让renderer可以处理异步任务／结果，这里应该返回Promise
  return new Promise((resolve, reject) => {
    // 创建vue实例和路由实例
    const { app, router, store } = createApp(context)

    // 获取用户请求url，从而知道要渲染那个页面
    // 跳转至对应的页面，最后由渲染器渲染
    router.push(context.url)

    // 监听路由器ready事件，确保异步任务都完成
    router.onReady(() => {

      // 首先处理异步数据请求
      //遍历组件，获取当前匹配组件
      //获取当前url所匹配的所有组件数组
      const matchedComponents = router.getMatchedComponents()

      // 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 遍历它们，判断是否含有预取数据的组件，进行处理
      //promise.all 处理所有的异步任务
      Promise.all(matchedComponents.map(comp => {
        // 看看它们有没有asyncData选项
        if (comp.asyncData) {
          // asyncData需要参数：store，route
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 所有预期钩子resolve后
        // store已经填充了当前数据状态
        // 这些数据需要同步到前端
        // 做一个序列化操作，前端使用window.__INITIAL_STATE__获取
        // 此处赋值给context.state，这是约定
        context.state = store.state

        resolve(app)
      }).catch(reject)

    }, reject)
  })

}
