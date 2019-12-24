<template>
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <div class="ball" v-show="show" :style="pos">
          <div class="inner">
            <div class="cubeic-add"></div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "CartAnim",
        data(){
          return {
            show:false
          }
        },
        props:['pos'],
      methods:{
          start(el){
            //启动动画窗口,传递元素(this.el是+号,el是执行的ball)
            this.el=el;
            //显示小球
            this.show = true;
          },
          beforeEnter(el){
            //把小球移动到点击的dom元素所在位置
            const rect = this.el.getBoundingClientRect();
            //转化为用户绝对定位的坐标
            const x=rect.left - window.innerWidth/2;
            const y=-(window.innerHeight - rect.top - 20 - 10);

            //ball只移动y
            el.style.transform=`translate3d(0,${y}px,0)`;

            //inner只移动y
            const inner = el.querySelector(".inner");
            inner.style.transform=`translate3d(${x}px,0,0)`;
          },
          enter(el,done){
            //获取offseHeight,浏览器开始重绘
            document.body.offsetHeight;

            //指定动画结束位置
            el.style.transform = `translate3d(0,0,0)`;
            const inner=el.querySelector(".inner");
            inner.style.transform = `translate3d(0,0,0)`;
            el.addEventListener('transitionend',done);
          },
        afterEnter(el){
            //动画结束
            this.show=false;
            el.style.display = "none";
            this.$emit("transitionend");//事件派发
          }
      }
    }
</script>

<style scoped lang="stylus">
 .ball-wrap{
   .ball {
     position: fixed;
     left:50%;
     bottom :10px;
     z-index:100000;
     background: red;
     border-radius: 8px;
     transition :all 1s cubic-bezier(0.49,-0.29,0.75,0.41);
     .inner{
       width:16px;
       height:16px;
       transition :all 1s linear;
       .cubeic-add{
         font-size 22px;
       }
     }
   }
 }
</style>
