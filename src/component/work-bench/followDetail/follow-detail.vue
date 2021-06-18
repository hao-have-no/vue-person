<template>
    <div>
      {{content}}
      {{msg|contentFilter}}
    </div>
</template>

<script>
    import {contentFix} from '@/utils/contentFilter.js'
    export default {
        name: "FollowDetail",
        props:{
          content:''
        },
        data(){
          return {
            msg:"init-follow"
          }
        },
        filters:{
            contentFilter(content){
              return contentFix(content);
            }
        },
        created() {

        }
      }
</script>

<style scoped>

</style>
