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
        <el-table :data="leagueCalendar">
          <el-table-column prop="group" label="Group"></el-table-column>
          <el-table-column prop="awayTeam" label="Away Team">
            <template slot-scope="scope">
              {{ scope.row.awayTeam.name }}
            </template>
          </el-table-column>
          <el-table-column prop="homeTeam" label="Home Team">
            <template slot-scope="scope">
              {{ scope.row.homeTeam.name }}
            </template>
          </el-table-column>
          <el-table-column prop="score" label="Winner" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.score.winner" type="success"
                >{{ scope.row.score.winner }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="Score" align="center">
            <template slot-scope="scope">
              <p>{{ getScore(scope.row.score) }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="utcDate" label="Date" width="142px">
            <template slot-scope="scope">
              <span style="white-space: nowrap">
                {{ formatDate(scope.row.utcDate) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 'CANCELED' ? 'danger' : 'info'"
                >{{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getScore, formatDate } from '../utils/functions';

  export default {
    name: 'LeaguesCalendar',
    data() {
      return {
        pickerData: [new Date(), new Date()],
      };
    },
    computed: {
      leagueCalendar() {
        return this.$store.state.leagues.leagueCalendar?.matches || [];
      },
    },
    methods: {
      getScore,
      formatDate,
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
