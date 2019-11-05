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
       }
    }
</script>

<style scoped>

</style>
