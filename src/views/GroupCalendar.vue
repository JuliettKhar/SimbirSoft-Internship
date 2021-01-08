<template>
  <div class="leagues-calendar">
    <el-row>
      <el-col style="display: flex">
        <el-date-picker
          v-model="pickerData"
          :disabledDate="disabledDate"
          type="daterange"
          start-placeholder="Start Date"
          end-placeholder="End Date"
          default-value="2010-10-01"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="matches">
          <el-table-column prop="group" label="Group" width="140"></el-table-column>
          <el-table-column prop="awayTeam" label="Away Team" width="120">
            <template slot-scope="scope">
              {{ scope.row.awayTeam.name }}
            </template>
          </el-table-column>
          <el-table-column prop="homeTeam" label="Home Team">
            <template slot-scope="scope">
              {{ scope.row.homeTeam.name }}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="Score">
            <template slot-scope="scope">
              <p>{{ getScore(scope.row.score) }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 'CANCELED' ? 'danger' : 'info'"
                >{{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="utcDate" label="Date">
            <template slot-scope="scope">
              <span style="white-space: nowrap">
                {{ formatDate(scope.row.utcDate) }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LeaguesListTable from '../components/LeaguesList/LeaguesListTable';
  import { getScore, formatDate } from '../utils/functions';

  export default {
    name: 'GroupCalendar',
    components: {
      LeaguesListTable,
    },
    data() {
      return {
        pickerData: [new Date(), new Date()],
      };
    },
    computed: {
      matches() {
        return this.$store.state.groups?.matches.matches || [];
      },
    },
    mounted() {
      this.getTamData();
    },
    methods: {
      getScore,
      formatDate,
      disabledDate() {},
      getTamData() {
        const { id } = this.$route.params;
        this.$store.dispatch('groups/GET_MATCHES', id);
      },
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
