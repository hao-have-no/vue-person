<template>
    <div>
      <h2>购物车</h2>
      <div>
        <h3>添加商品</h3>
        <div>
          <input type="text" v-model="stateLesson.id" placeholder="编号"/>
          <input type="text" v-model="stateLesson.name" placeholder="姓名"/>
          <input type="text" v-model="stateLesson.price" placeholder="金额"/>
          <button v-on:click="addList()">添加课程到列表</button>
        </div>
      </div>
      <div>
         <h3>商品列表</h3>
        <table>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>价格</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in lesson">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.price}}</td>
            <td><button @click="addLesson(index)">添加购物车</button></td>
          </tr>
        </table>
      </div>
      <Bus :current-item="bus" @removeItem="remove"></Bus>
    </div>
</template>

<script>
    import Bus from './bus';
    export default {
      name: "shopping",
      components: {Bus},
      data() {
        return {
          stateLesson:{
            id:'',
            name:'',
            price:''
          },
          lesson:[
            {
            id:'1',
            name:'票',
            price:2000
          },
            {
              id:'2',
              name:'孤独',
              price:2000
            }
          ],
          bus:[]
        }
      },
      methods:{
        //添加到课程列表
        addList:function(){
          var isHave=this.lesson.find(item=>item.id==this.stateLesson.id||item.name == this.stateLesson.name);
          if (!isHave){
            var lesson=JSON.parse(JSON.stringify(this.stateLesson));
            this.lesson.push(lesson);
          }
          for (let i in this.stateLesson){
            this.stateLesson[i]="";
          }
        },
        //添加到购物车
        addLesson:function(index){
             let item=this.lesson[index];
             let isHasCourse=this.bus.find(obj =>obj.id == item.id);
             if (isHasCourse){
               isHasCourse.number+=1;
             }else{
               this.bus.push({...item,number:1,isActive:true});
             }
        },
        remove:function (id) {
          this.bus.splice(id,1);
        }
      },
    }
</script>

<style scoped>

</style>
