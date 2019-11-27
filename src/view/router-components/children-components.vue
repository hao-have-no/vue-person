<template>
  <div>
    this is recombination children
    <p>{{$store.state.count}}</p>
    <button @click="add">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script>
    export default {
        name: "children-components",
        methods:{
          add(){
            console.log('123')
            this.$store.dispatch('increment');
          },
          minus(){
            console.log('123')
            this.$store.dispatch('decrement');
          }
        },
    }
</script>

<style scoped>

</style>
