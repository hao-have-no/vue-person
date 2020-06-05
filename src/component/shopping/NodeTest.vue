<template>
    <div>
      <Node :data="folder"></Node>
    </div>
</template>

<script>
    import Node from "./Node";
    export default {
        name: "NodeTest",
        data(){
          return{
            //树形结构数据
            folder:{
              name:'vue-study',
              children:[
                {name:"src",children:[
                  {name:"main.js"}
                  ]},
                {name:"package.json"}
              ]
            }
          }
        },
      components: {Node}
    }
</script>

<style scoped>

</style>
