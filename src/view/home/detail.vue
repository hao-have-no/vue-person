<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
    export default {
        name: "ContentDetail",
        props: {
          msg: String
        },
      activated() {
        console.log('activated');
        console.log("%c%s", "color:green","el     : " + this.$el);
      },
      deactivated() {
        console.log('deactivated');
        console.log("%c%s", "color:green","el     : " + this.$el);
      },
      beforeCreate: function () {
        console.log('子组件beforeCreate');
      },
      created: function () {
        console.log('子组件created ');
      },
      beforeMount: function () {
        console.log('子组件beforeMount');
      },
      mounted: function () {
        console.log('子组件mounted');
      },
      beforeUpdate: function () {
        console.log('子组件beforeUpdate');
      },
      updated: function () {
        console.log('子组件updated');
      },
      beforeDestroy: function () {
        console.log('子组件beforeDestroy');
      },
      destroyed: function () {
        console.log('子组件destroyed');
      }
    }
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
