<template>
  <div>
    this is recombination children
    <p>{{$store.state.count}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
    export default {
        name: "children-components",
        methods:{
          ...mapActions([
              'increment',
            　'decrement'//分发action
            ])
          }
        //   {
        //   add(){
        //     console.log('123')
        //     this.$store.dispatch('increment');
        //   },
        //   minus(){
        //     console.log('123')
        //     this.$store.dispatch('decrement');
        //   }
        // },
    }
</script>

<style scoped>

</style>
