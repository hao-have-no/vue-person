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

// function update(){
//     app.innerText = obj.foo;
// }

//递归对象，使对象的所有属性都被拦截
function observe(obj){
    if (typeof obj !== 'object' || obj == null){
        return;
    }

    Object.keys(obj).forEach(key=>{
        defineReactive(obj,key,obj[key]);
    });
}

function set(obj,key,val){
    defineReactive(obj,key,val);
}

//形参value--> return val,值变了,再修改val（闭包思想，每个响应式都是独立的，拥有局部作用域并且暴露给外部使用，内部变量可以保存）
//get函数往外暴露属性
//从响应式看闭包：拦截属性，获取并触发对应的更新方法，ｓｅｔ相应，更新属性


const obj = {foo:'123',bar:'234',baz:{a:'123'}};

observe(obj);

// obj.bar
// obj.baz.a
// obj.baz.a = '222';

//输出不出来，全新的对象没有做过递归，不具有响应
// obj.a='';


//$set
// set(obj,'dong','dong');
// obj.dong;
