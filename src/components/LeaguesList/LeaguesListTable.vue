<template>
  <div>
    <el-table :data="leaguesData" stripe fit @row-click="onRowClick">
      <el-table-column prop="area" label="Area">
        <template slot-scope="scope">
          <span>{{ scope.row.area.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="Code" width="90px">
        <template slot-scope="scope">
          {{ formatCode(scope.row.code) }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="currentSeason" label="Current Season" width="142px">
        <template slot-scope="scope">
          <ul class="leagues-list__season">
            <li v-if="formatSeasonDate(scope.row.currentSeason)">
              <span>Season: </span>{{ formatSeasonDate(scope.row.currentSeason) }}
            </li>
            <li v-if="formatWinner(scope.row.currentSeason).command">
              <span>Winner: </span>{{ formatWinner(scope.row.currentSeason).command }}
              <img :src="formatWinner(scope.row.currentSeason).img" alt="flag" />
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="lastUpdated" label="Last Updated">
        <template slot-scope="scope">
          {{ formatDate(scope.row.lastUpdated) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="numberOfAvailableSeasons"
        label="Available Seasons"
        width="90px"
      ></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'LeaguesTable',
    props: {
      leaguesData: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      formatSeasonDate(season) {
        const startDate = new Date(season?.startDate).getFullYear() || '';
        const endDate = new Date(season?.endDate).getFullYear() || '';
        return startDate && endDate ? `${startDate} / ${endDate}` : '';
      },
      formatWinner(season) {
        const command = season?.winner ? season.winner.shortName : '';
        const img = season?.winner ? season.winner.crestUrl : '';
        return {
          command,
          img,
        };
      },
      formatDate(date) {
        if (!date) {
          return '-';
        }

        const day = new Date(date).getDate();
        const month = new Date(date).getMonth() + 1;
        const year = new Date(date).getFullYear();

        return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      },
      formatCode(code) {
        return code ? code : '-';
      },
      onRowClick(row) {
        this.$router.push({ name: 'leagues-overview', params: { id: row.id } });
      },
    },
  };
</script>

<style scoped lang="scss">
  .leagues-list {
    &__season {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & li {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }

      & li > span {
        display: inline-flex;
        margin-right: 4px;
        font-weight: bold;
        white-space: nowrap;
      }

      & li > img {
        margin-left: 4px;
        width: 20px;
        height: auto;
      }
    }
  }
</style>
