// create-->v3  render(h){}
 // vue2:-->render:h=>h(App)

//virtual dom
export function h(tag,props,children){
    //vnode
    return{
        tag,
        props,
        children
    }
}