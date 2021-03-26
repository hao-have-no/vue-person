<template>
  <div class="container">
    <virtual-list v-if="articles.length" :listData="articles"></virtual-list>
  </div>
</template>

<script>
  import VirtualList from '../../component/Virtual/VirtualList'
  import api from "../../axios/api";

  export default {
    //虚拟列表
    name: "modListOne",
    data() {
      return {
        articles: []
      }
    },

    async mounted() {
      // return vue.$http.post(api.getLogin())
      // let ret = await this.$http.post(api.getArticle());
      // if (ret.code == 200){
      this.articles = [
        {_id: "11442211",title: "111"},
        {_id: "11442212",title: "121"},
        {_id: "11442213",title: "131"},
        {_id: "11442215",title: "151"},
        {_id: "11442212",title: "123"},
        {_id: "11442216",title: "161"},
        {_id: "11442215",title: "152"},
        {_id: "11442215",title: "1543"},
        {_id: "11442212",title: "12324"},
        {_id: "11442215",title: "1523"},
        {_id: "11442211",title: "11231"},
        {_id: "11442222",title: "221"},
        {_id: "11442232",title: "321"},
        {_id: "11442244",title: "4421"},
        {_id: "11442252",title: "523421"},
        {_id: "11442264",title: "6422321"},
        {_id: "11442223",title: "231"},
        {_id: "11442233",title: "331"},
        {_id: "11442244",title: "4431"},
        {_id: "11442252",title: "523431"},
        {_id: "11442264",title: "6422331"},
        {_id: "11442225",title: "251"},
        {_id: "11442235",title: "351"},
        {_id: "11442244",title: "4451"},
        {_id: "11442252",title: "523451"},
        {_id: "11442264",title: "6422351"},
        {_id: "11442222",title: "223"},
        {_id: "11442232",title: "323"},
        {_id: "11442244",title: "4423"},
        {_id: "11442252",title: "523423"},
        {_id: "11442264",title: "6422323"},
        {_id: "11442226",title: "261"},
        {_id: "11442236",title: "361"},
        {_id: "11442244",title: "4461"},
        {_id: "11442252",title: "523461"},
        {_id: "11442264",title: "6422361"},
        {_id: "11442225",title: "252"},
        {_id: "11442235",title: "352"},
        {_id: "11442244",title: "4452"},
        {_id: "11442252",title: "523452"},
        {_id: "11442264",title: "6422352"},
        {_id: "11442225",title: "2543"},
        {_id: "11442235",title: "3543"},
        {_id: "11442244",title: "44543"},
        {_id: "11442252",title: "5234543"},
        {_id: "11442264",title: "64223543"},
        {_id: "11442222",title: "22324"},
        {_id: "11442232",title: "32324"},
        {_id: "11442244",title: "442324"},
        {_id: "11442252",title: "52342324"},
        {_id: "11442264",title: "642232324"},
        {_id: "11442225",title: "2523"},
        {_id: "11442235",title: "3523"},
        {_id: "11442244",title: "44523"},
        {_id: "11442252",title: "5234523"},
        {_id: "11442264",title: "64223523"},
        {_id: "11442221",title: "21231"},
        {_id: "11442231",title: "31231"},
        {_id: "11442244",title: "441231"},
        {_id: "11442252",title: "52341231"},
        {_id: "11442264",title: "642231231"},
      ];
      // }
    },
    components: {
      VirtualList
    },
  }
</script>

<style scoped>
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
  }
</style>
