//数据响应式
function defineReactive(obj,key,val){

    //循环递归
    observe(obj[key]);

    Object.defineProperty(obj,key,{
        get(){
            console.log('get',key);
            return val;//不返回的话，外部引用不到
        },
        set(newVal){
            if(newVal !== val){
                console.log('set',key,newVal);

                //对新值进行判断
                observe(newVal);

                val = newVal;
                // update();
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
        new Compiler(el,vm);
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
//new Compiler('#app',vm)
class Compiler{
    constructor(el,vm){
        this.$vm = vm;
        this.$el = document.querySelector(el);

        //执行编译
        this.compile(this.$el);
    }

    compile(el){
        //遍历DOM树
        el.childNodes.forEach(node=>{
            //是否是元素
            if (node.nodeType === 1){
                this.compileText(node)
            }else if(this.isInter(node)){
                //判断是够是文本节点，切符合{{}}
            }

            //递归，避免有孩子节点的情况
            if (node.childNodes){
                this.compile(node);
            }
        })
    }

    //解析差值绑定表达式
    compileText(node){
        //RegExp.$1:正则表达式分组情况
        node.textContent = this.$vm[RegExp.$1]
        // console.log()
    }

    //判断是够是插值文本节点
    isInter(node){
        return node.nodeType === 3&&/\{\{(.*)\}\}/.test(node.textContent)
    }
}
