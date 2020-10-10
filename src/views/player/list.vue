<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.acountname" :placeholder="$t('player.acountname')"
        style="width:200px"
        @keyup.enter.native="handleFilter"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{$t('player.btnFilter')}}</el-button>
      <el-button type="default" icon="el-icon-edit" @click="handlerCreate">{{$t('player.btnCreate')}}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" align="center">
        <template v-slot="{row}">{{row.id}}</template>
      </el-table-column>
      <el-table-column label="账户名" align="center">
          <template v-slot="{row}">
            {{row.acountname}}
          </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
  <!--分页-->
</template>

<script lang="ts">
import { Vue , Component } from 'vue-property-decorator';
import { getPlayers } from '@/api/players';
import { Player } from '@/api/types'
import Pagination from "@/components/Pagination/index";

@Component({
  name:'PlayerList',
  components:{
    Pagination
  }
})
export default class list extends Vue{
    //玩家数据
    list:Player[] = [];

    //加载状态
    listLoading = true;

    //总条目书
    total = 0;

    //查询条件
  listQuery = {
    page:1,//默认第一页
    limit:5,
    acountname:undefined,
  }

    created(): void {
      //获取数据列表
      this.getList();
    }

    //获取列表
  async getList(){
      this.listLoading = true;
      const {data} = await getPlayers(this.listQuery);
      this.total = data.total;
      console.log(data.players);
      this.list = data.players;
      this.listLoading = false;
  }

  handleFilter(){
    this.listQuery.page = 1;
    this.getList()
  }

  handlerCreate(){
      this.$router.push('/players/create')
  }

}
</script>

<style>

</style>
