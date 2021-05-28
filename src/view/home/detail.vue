<template>
  <div>
    <module-title #titleName>
       <p>详情<span class="color-red">12</span></p>
    </module-title>

  </div>
</template>

<script>
    import ModuleTitle from "../../component/module-title/module-title";
    export default {
        name: "UserDetail",
        components: {ModuleTitle},
        props: {
            msg: String
          },
        methods:{

        },
        computed:{
          // console.log('computed')
        },
        watch:{
          // console.log('watch')
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
