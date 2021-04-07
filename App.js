import {ref, h} from './core/index.js'

export const App = {
    render(context){
        //2021-0401 render-->渲染real dom
        // const div = document.createElement('div');
        // div.setAttribute('id',1);
        // div.textContent = "heihei= mini vue-->"+context.a.value;
        // const p = document.createElement('p');
        // p.textContent = 'init ppp';
        // div.append(p);
        // // 再次抽象,用户返回节点
        // // document.querySelector('#app').append(div);
        // return div;
        
         //2021-0402增加middle,render-->middle-->dom element
        //middle 对比数据，来进行dom的生成   vdom-->dom
        //tag-->div
        //props 设置属性
        // children --> 'heihei~~~~~'

        //h函数，根据数据生成虚拟dom
        // return h("div",{id:1},"heihei"+context.a.value);
        return h("div",{id:1+context.a.value},[h("p",{},"heihei"+context.a.value),h("p",{},"hahaha")]);

    },
    setup(){
        // Composition API 的入口
        const a = ref(10);
        window.a = a;
        return{
            a,
        }
    }
}