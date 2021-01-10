<template>
  <el-table :data="calendarData">
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
</template>

<script>
  import { getScore, formatDate } from '../../utils/functions';

  export default {
    name: 'CalendarTable',
    props: {
      calendarData: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      getScore,
      formatDate,
    },
  };
</script>

<style scoped></style>
