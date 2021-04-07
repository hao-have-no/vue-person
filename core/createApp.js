import {effect} from './index.js';
import {mountElement,diff} from './renderer.js';

//创建根节点
export function createApp(rootComponent){
    return {
        mount(rootContainer){
            //参数响应式
            const context = rootComponent.setup();

            //20210406-diff
            //isMounted 是否实例化
            let isMounted = false;

            let prevSubTree; //之前的数据

            effect(()=>{
                if(!isMounted){
                    //reset 
                    isMounted = true;
                    rootContainer.textContext = '';

                    //2021-0401render--> real element
                    // const element = rootComponent.render(context);
                
                    //2021-0402 引入middle  生成虚拟node tree
                    // vnode
                    const subTree = rootComponent.render(context);

                    prevSubTree  = subTree;

                    //vnode--> mountElement

                    console.log(subTree);
                
                    //虚拟节点，容器
                    mountElement(subTree,rootContainer);

                    // rootComponent.append(element);
                }else{
                    //update
                    const subTree = rootComponent.render(context);
                    console.log(prevSubTree,subTree);
                    diff(prevSubTree,subTree);
                    prevSubTree = subTree;
                    // mountElement(prevSubTree,rootContainer);
                }
            })
        }
    }
}