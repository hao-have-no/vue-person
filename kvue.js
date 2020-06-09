//ｍｍｖｍ整个流程
//1.先将传过来的option里面的选项保存起来
//2.对options.data的数据进行observer响应化处理（判断类型，new observer实例,便利对象完成所有data的响应化）
//3.代理option.data的属性到vm的实例上，也同时进行响应化操作
//4.解析模版Compile，找到动态绑定的数据，从ｄａｔａ中获取数据并初始化视图
//5.同时定义update函数和watch监听函数(互相关联),通过响应式捕捉到数据的变化后,对应的watch调用更新函数
//6.以key为唯一标识，每个key需要一个管家去管理
// 多个watch函数(每一个key(counter)都会生成一个watch:eg:<p>{{counter}}</p>和<p k-text='counter'></p>)
//7.dara变化后，找到对应的dep,dep会通知所有的watch去执行更新函数

//依赖收集怎么弄
//5.1 在defineProperty过程中为每个key增加dep（管家）实例
//5.2 初始化视图的时候，读取key，创建一个watch１
//5.3 初始化，触发getter时，将watcher１添加到对应的dep中
//5.4 name变化时,通过对应的dep通知watch



//抽象以后，实际为
// 初始话update的时候,顺便创建watchs实例，watch实例保存了当前的key,kvue实例和更新方法
// 数据变化后，watchers循环执行更新操作
//具体的关联是在初始化时已经声明了完成的视图操作．此时通过响应式将watch和dep实现并关联，
//通过数据的更新从而通过dep通知watch更新对应的视图，此时的操作还是初始化的视图操作流程
//注意watch函数和事件的操作中上下文的指示(kvue实例和具体watch的绑定)

//数据响应式
function defineReactive(obj,key,val){

    //循环递归
    observe(obj[key]);

    //因为数据响应式是一个闭包的实现，里面的key是唯一的
    const dep = new Dep();

    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key);

            //5,通过getter传入dep
            //依赖手机，关联dep和watch
            //希望watch实例化时，访问对应的key,同时将实例置于Dep的target上面
            Dep.target&&dep.addDep(Dep.target);
            //不会重复，同样的key只会创建一次，但是在使用的时候可能存在多个watch
            //同样每个key拥有自己的dep去储存watch

            return val;//不返回的话，外部引用不到


        },
        set(newVal){
            if(newVal !== val){
                console.log('set',key,newVal);

                //对新值进行判断
                observe(newVal);

                val = newVal;
                // update();

                //值更新，通知watchers去更新
                // watchers.forEach(watch=>watch.update())

                //通知更新
                dep.notify();

            }
        }
    })
}

//递归对象，使对象的所有属性都被拦截
function observe(obj){
    if (typeof obj !== 'object' || obj == null){
        return;
    }

    //创建Observer实例:出现一个对象就会创建一个Observer实例
    //_ob_

    new Observer(obj);
}


//代理data中的数据到vue的实例上，方便直接访问
function proxy(vm){
    Object.keys(vm.$data).forEach(key=>{
        Object.defineProperty(vm,key,{
            get(){
                return vm.$data[key]
            },
            set(v){
                vm.$data[key] = v;
            }
        })
    })
}

//Kvue
//1.响应式操作
class KVue{
    //配置对象
    constructor(options){
        //保存选项
        this.$options = options;
        this.$data = options.data;

        //响应式处理
        observe(this.$data);

        //代理data
        proxy(this);

        //编译
        new Compiler('#app',this);
    }
}


//数据响应化
class Observer{
    constructor(value){
        this.value = value;
        this.walk(value);
    }


    //便利对象做响应式
    walk(obj){
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key]);
        });
    }
}

//Compiler:解析模版，找到依赖，并和前面拦截的属性进行关联
//new Compiler('#app',vm) //宿主元素和vue实例传入
class Compiler{
    constructor(el,vm){
        this.$vm = vm;
        this.$el = document.querySelector(el);

        //执行编译
        this.compile(this.$el);
    }

    compile(el){
        //遍历DOM树（拿到node节点）
        el.childNodes.forEach(node=>{
            //是否是元素
            if (node.nodeType === 1){
                console.log('元素',node.nodeName);
                this.compileElement(node);//编译元素
                //匹配元素后根据业务中心，去调用具体的操作
            }else if(this.isInter(node)){
                console.log('文本',node.textContent);
                //判断是够是文本节点，切符合{{}}
                this.compileText(node);
            }

            //递归，避免有孩子节点的情况
            if (node.childNodes){
                this.compile(node);
            }
        })
    }

    //解析差值绑定表达式
    compileText(node){
        //RegExp.$1:获取正则表达式匹配结果，从vm中拿出对应的值
        // node.textContent = this.$vm[RegExp.$1]

        //通过update控制中心操作

        this.update(node,RegExp.$1,'text');

        //做了代理，可以直接拿
        // console.log()
    }

    //编译元素，处理元素上的属性(k-或者@开头的)
    compileElement(node){
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr=>{
            //attr {name:'k-text',value:'counter'}
            const attrName = attr.name;
            const exp = attr.value;

            if (attrName.indexOf('k-') === 0){
                const dir = attrName.substring(2);//从第2位截取
                //判断是够存在对应的方法
                this[dir]&&this[dir](node,exp);
            }

            if (attrName.indexOf('@') == 0){
                const dir = attrName.substring(1);
                this.eventHandler(node,exp,dir,this.$vm);
            }

            //事件处理需要注意上下文
        })
    }

    //业务监听处理，通过调用update业务中心，去执行对应的实际业务处理函数

    //处理k-text
    text(node,exp){
        // node.textContent = this.$vm[exp];
        //抽离后，这面只用去调取实操操作
        this.update(node,exp,'text');
    }

    // html(node,exp){
    html(node,exp){
        // node.innerHTML = this.$vm[exp]
        this.update(node,exp,'text');
    }

    //事件处理器
    eventHandler(node,exp,dir,vm){
        console.log(node,exp,dir);

        let fn = vm.$options.methods[exp];

        if(fn&&dir){
            node.addEventListener(dir,()=>{
               console.log(this);
                fn.call(this.$vm)
            });
        }
    }

    //k-modal实现 主要是:input @input
    model(node,exp){
        //input,直接改值就行
        this.update(node,exp,'model');

        //@input
        node.addListener('input',e=>{
          this.$vm[exp] = e.target.value;
        })
    }

    //抽离业务组件－－业务中心控制器，对应5.2/5.4
    // （text,html等更新操作）
    // 节点，key,dir(操作器名称)
    update(node,exp,dir){
        const fn= this[dir+'Updater'];
        fn&&fn(node,this.$vm[exp]);

        //更新，创建watch实例
        // const w=
            new Watch(this.$vm,exp,val=>{
            fn&&fn(node,val);
        })

        //每一次的初始化操作,都会创建watch实例并挂载到dep中
        // watchers.push(w);暴力方法，放在一起

    }

    //modal的实现
    modelUpdater(node,val){
        node.value = val;
    }

    //抽离出来的具体的业务实现
    textUpdater(node,val){
        node.textContent = val;
    }

    htmlUpdater(node,val){
        node.innerHTML = val;
    }

    //判断是够是插值文本节点(插值绑定)
    isInter(node){
        return node.nodeType === 3&&/\{\{(.*)\}\}/.test(node.textContent)
    }
}

//管理一个依赖,未来执行更新
// const watchers=[];
class Watch{
    constructor(vm,key,updateFn){
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn;

        //触发依赖收集
        Dep.target = this;
        vm[key];//读一下,依赖收集完成
        Dep.target = '';
    }

    //dep的实例会被Dep调用
    update(){
        //指定上下文为vm,指定参数来自vm上的
        // this.updateFn的this指向watch,而指定上下文的话拿不到最新的值
        //执行具体的业务操作，传入值
        //call(this指向和参数)，指定一下上下文，避免错乱
        this.updateFn.call(this.vm,this.vm[this.key]);
    }
}


//保存所有的watch实例,当某个key发生变化，通知key对应的watch去更新
class Dep{
    constructor(){
        this.deps = [];
    }

    //加入watch
    addDep(watcher){
        this.deps.push(watcher);
    }


    //将所有的watch执行一下
    notify(){
        this.deps.forEach(dep=>dep.update())
    }

}
