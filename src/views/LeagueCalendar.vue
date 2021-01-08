<template>
  <div class="leagues-calendar">
    <el-row>
      <el-col>
        <div class="leagues-calendar__wrapper">
          <el-date-picker
            v-model="pickerData"
            :disabledDate="disabledDate"
            type="daterange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            default-value="2010-10-01"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData">
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
  export default {
    name: 'LeaguesCalendar',
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      };

      return {
        pickerData: [new Date(), new Date()],
        tableData: Array(10).fill(item),
      };
    },
    mounted() {
      this.getLeagueData();
    },
    methods: {
      getLeagueData() {
        const { id } = this.$route.params;
        this.$store.dispatch('leagues/GET_LEAGUES_BY_ID', id);
      },
      disabledDate() {},
    },
  };
</script>

<style scoped lang="scss">
  .leagues-calendar {
    &__wrapper {
      width: fit-content;
      margin-bottom: 20px;
    }
  }
</style>
