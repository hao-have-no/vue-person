<template>
    <div>
      <!--<message :isShow="show" @close="show =$event">新增课程成功</message>-->
      <!--<message :show.sync="show" class="message-success">-->
        <!--<template v-slot:title>恭喜</template>-->
        <!--<template>新增课程成功</template>-->
      <!--</message>-->

      <message ref="msg" class="message-success">
      <template v-slot:title>恭喜</template>
      <template>新增课程成功</template>
      </message>
      <message ref="warn" class="message-warn">
        <template v-slot:title>警告</template>
        <template>请添加课程</template>
      </message>

      <!--
      使用ref注意点:
        ref在mounted中访问，因为它是被作为渲染结果出现的
        $ref不是响应式的
        在遇见v-for用于元素和组件的时候，引用信息（获取到的数据是）包含dom节点和组件实例的数组
      -->


      <!--混入
      　因为定义了created，所以在导入的时候会自动创建和实例化
      组件内部定义的混入等级会更高，同时定义的组件內的组件会兼并外部的
      相同对象
      -->

      <!--插件
          //可以直接放入npm,方便他人引用使用
          //1.声明并暴露install方法,该方法的第一个参数是vue构造器,
          第二个是可选的选项对象
          //2.给prototype上增加方法
      -->


      <h2>购物车</h2>
      <div>
        <h3>添加商品</h3>
        <div>
          <input type="text" v-model="stateLesson.id" placeholder="编号"/>
          <input type="text" v-model="stateLesson.name" placeholder="姓名"/>
          <input type="text" v-model="stateLesson.price" placeholder="金额"/>
          <button v-on:click="addList()">添加课程到列表</button>
        </div>
        <course-add v-model="course"  @add-course="addCourse"></course-add>
        <div>
          <p v-for="item in courses" :key="item.name">{{item.name}}-{{item.price}}</p>
        </div>
        <div>
          <button @click="$bus.$emit('message-close')">清空提示框</button>
        </div>
        <!--<course-add @input='course = $event' :value='course' @add-course="addCourse"></course-add>-->
        <!--v-modal做了数据绑定，主要和子组件的@Input做了关联，
        因为子组件的props接收了
        通过emit完成父子组件的通信
        -->
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
    import CourseAdd from "./course-add";
    import Message from "./message";
    export default {
      name: "shopping",
      components: {Message, CourseAdd, Bus},
      data() {
        return {
          course:'',
          courses:[],
          show:false,
          showWarn:false,
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

      //vuex：状态映射
      //...mapState('user',['isLogin'])
      //相当于获取了key,value形式
      //isLogin相当于获取返回值中的isLogin的值

      //

      methods:{
        addCourse:function(){
          if (!this.course){
            //父子组件通信
            // this.showWarn = true;

            //使用refs引用子组件
            //$refs.warn访问自定义组件
            this.$refs.warn.toggle();
            return;
          }
          this.courses.push({name:this.course,price:''});
          console.log(this.courses,this.course);
          this.course = '';
          // this.show = true;
          this.$refs.msg.toggle();
        },

        //批量更新价格
        updatePrice:function(){
          this.courses.map(option=>{
            option.price = 100;
          })
        },


        //添加到课程列表
        addList:function(){
          // let data = Object.values(this.stateLesson);
          let lessonModal = this.stateLesson;
          for (let i in lessonModal){if (!lessonModal[i])return };
          var isHave=this.lesson.find(item=>(item.id==lessonModal.id||item.name == lessonModal.name));
          if (!isHave){
            var lesson=JSON.parse(JSON.stringify(lessonModal));
            this.lesson.push(lesson);
          }
          for (let i in lessonModal){
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
  .message-success{
    background: #4fc08d;
    border: 1px solid #42b983;
  }
  .message-warn{
    background: #f66;
    border: 1px solid #d63200;
  }
</style>
