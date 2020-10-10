<template>
  <div>
    <player-detail :is-deit="false"></player-detail>
  </div>
</template>

<script lang="ts">
import {Vue , Component} from "vue-property-decorator";
import PlayerDetail from "./components/PlayerDetail.vue";

@Component({
  components:{
    PlayerDetail
  }
})
export default class create extends Vue{

}
</script>

<style>

</style>
