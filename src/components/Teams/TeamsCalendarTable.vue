<template>
  <el-table v-loading="loading" :data="teamsData">
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

    <el-table-column prop="utcDate" label="Date">
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
  import { getScore, formatDate } from '@/utils/functions';

  export default {
    name: 'TeamsCalendarTable',
    props: {
      teamsData: {
        type: Array,
        default: () => [],
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      getScore,
      formatDate,
    },
  };
</script>

<style scoped></style>
