<template>
  <div>
    <h3>购物车</h3>
    <div>
      <table>
        <tr>
          <td>勾选</td>
          <td>课程名称</td>
          <td>课程价格</td>
          <td>数量</td>
          <td>价格</td>
        </tr>
        <slot v-if="currentItem.length === 0">
          没有任何课程信息
        </slot>
        <slot v-else>
          <tr v-for="(item,index) in currentItem" :key="item.id">
            <td><input type="checkbox" v-model="item.isActive"></td>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td><button @click="minus(index)">-</button>{{item.number}}<button @click="add(index)">+</button></td>
            <td>{{item.price*item.number}}</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="2">{{isActiveCourse}}/{{allCourseList}}</td>
            <td colspan="2">{{allPrice}}</td>
          </tr>
        </slot>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "bus",
      //遵守单项数据流，emit与on，事件的监听与实现
        props:['currentItem'],
        data() {
          return {

          }
        },
        methods:{
            minus:function (index) {
              let number=this.currentItem[index].number;
              if (number > 1){
                this.currentItem[index].number-=1;
              }else{
                if(window.confirm("确定要删除吗")){
                    this.$emit('removeItem',index);
                  }
                }
            },
            add:function (index) {
              this.currentItem[index].number +=1;
            },

        },
       computed:{
          //对属性进行监听
          isActiveCourse(){
            return this.currentItem.filter(item=>item.isActive).length;
          },
         allCourseList(){
           return this.currentItem.length;
         },
         allPrice(){
             let num=0;
             this.currentItem.forEach(item=>{
               if (item.isActive){
                 num+=item.number*item.price;
               }
             });
           return num;
         }
       },
      filters:{
          //全局的话就在vue.prototype上声明
        //默认带入的是ｖａｌｕｅ，使用时声明就行，不需要传参，有个有更多个参数，
        //按照从第二位开始，进行传参
        //currentItem(unit,number) ---->  currentItem(value,unit,number){}
        currency(value){
          return value+'－－v'
        }
        //自定义指令－－＞主要用来操作dom
        //Vue.directive('focus',{
        //inserted是自定义指令指定的过程名称
        // inserted(el){el.focus}})
        //使用 v-focus

      },
      // watch: {
      //
      //   // currentItem(newValue, oldValue) {
      //   //   this.isActiveCourse =  this.currentItem.filter(item=>item.isActive).length;
      //   // }
      // },
    }
</script>

<style scoped>

</style>
