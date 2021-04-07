// diff
// vue3 -> custom renderer 自定义渲染器
function createElement(type){
    return document.createElement(type)
}

function patchProps(el,key,prevValue,nextValue){
    //处理元素的属性
    if(nextValue === null){
        el.removeAttribute(key);
        return;
    }
    el.setAttribute(key,nextValue);
}

function createTextNode(text){
    return document.createTextNode(text)
}

function insert(el,parent){
    parent.append(el);
}

function remove(el,parent){
    parent.removeChild(el);
}

export function mountElement(vnode,container){
    //20210406-自定义渲染器-抽离所有能复用的方法
    //vnode ---> element
    const {tag,props,children} = vnode;
    //tag
    // const element = document.createElement(tag)

    //暂存el,diff需要el进行对比
    const element = (vnode.el = createElement(tag));
    //props
    Object.keys(props).forEach(key=>{
        // element.setAttribute(key,props[key])
        patchProps(element,key,null,props[key]);
    })
    //children
    // string array
    if(typeof children === "string"){
        // const textNode = document.createTextNode(children);
        const textNode = createTextNode(children);
        // element.append(textNode);
        insert(textNode,element);
    }else if(Array.isArray(children)){
        //TODO
        children.forEach(v=>{
            mountElement(v,element);
        })
    }

    //insert
    insert(element,container);
    // container.append(element);
}


//20210406
//n1-->old
export function diff(n1,n2){
    //tag
    //props
    //children
    if(n1.tag !== n2.tag){
        //替换标签
        v1.el.replaceWith((n2.el = createElement(n2.tag)))
    }else{
        //props
        // 1. old-->{id:1}    new--> {id:2}
        const el = (n2.el = n1.el);
        const {props:oldProps} = n1;
        const {props:newProps} = n2;

        Object.keys(newProps).forEach(key=>{
            if(oldProps[key] !== newProps[keys]){
                patchProps(el,key,oldProps[key],newProps[key]);
            }
        })

        // 2. old-->{id,class}   new-->{id}
        Object.keys(oldProps).forEach(key=>{
            if(!(key in newProps)){
                patchProps(el,key,oldProps[key],null);
            }
        })


        //children
        // diff 暴力算法
        //1. string--> old--> string/array
        //1. array--> old--> string/array

        //new [a,b,c] old:[a,c,d]

        const {children:oldChildren} = n1;
        const {children:newChildren} = n2;

        if(typeof newChildren === 'string'){
            if(typeof oldChildren === 'string'){
                if(oldChildren !== newChildren){
                    el.textContent = newChildren;
                }
            }else if(Array.isArray(newChildren)){
                el.textContent = newChildren;
            }
        }else if(Array.isArray(newChildren)){
            if(typeof oldChildren === "string"){
                //reset
                el.textContent = "";
                newChildren.forEach(v=>mountElement(v,el));
            }else if(Array.isArray(oldChildren)){
                 //1.依次比对
                 //new [a,b,c] old:[a,b,e] update
                 //new [a,b] old:[a,b,c] delete
                 //new [a,b,c] old:[a,b] add

                 const length = Math.min(newChildren.length,oldChildren.length);
                 for(let i=0;i<length;i++){
                     const oldChild = oldChildren[i];
                     const newChild = newChildren[i];
                     diff(oldChild,newChild);
                 }

                 //2
                 if(oldChildren.length > newChildren.length){
                     for(let i=length;i<oldChildren;i++){
                        const vnode = oldChildren[i];
                        remove(vnode.el,el)
                     }
                 }

                 if(oldChildren.length < newChildren.length){
                    for(let i=length;i<newChildren;i++){
                      mountElement(newChildren[i],el);
                    }
                }
            }
        }

    }
}