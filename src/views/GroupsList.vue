<template>
  <div class="">
    <el-row :gutter="20">
      <el-col>
        <ListsFilters :filters="filters" @search="searchLeagueEntity" @pick="searchLeagueByYear" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" stripe fit @row-click="onRowClick">
          <el-table-column prop="date" label="Date" width="140"></el-table-column>
          <el-table-column prop="name" label="Name" width="120"></el-table-column>
          <el-table-column prop="address" label="Address"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ListsFilters from '../components/LeaguesList/ListsFilters';

  export default {
    name: 'GroupsList',
    components: {
      ListsFilters,
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        id: 1,
      };
      const query = this.$route?.query || {};

      return {
        filters: {
          searchInput: query?.searchInput || null,
          pickerData: query?.pickerData || null,
        },
        tableData: Array(10).fill(item),
      };
    },

    methods: {
      onRowClick(row) {
        this.$router.push({ name: 'group-calendar', params: { id: row.id } });
      },
      querySearchAsync() {},
      handleSelect() {},
    },
  };
</script>

<style scoped lang="scss"></style>
