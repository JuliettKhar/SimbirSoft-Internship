<template>
  <div class="">
    <el-row>
      <el-col :md="12">
        <div class="league-overview-img"></div>
      </el-col>
      <el-col :md="12">
        <p>
          <el-tag size="medium">{{ leagueOverview.name }}</el-tag>
        </p>
        <p>{{ getAreaName }}</p>
        <p>{{ leagueOverview.startDate }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Teams" name="teams">
            <GroupsList />
          </el-tab-pane>
          <el-tab-pane label="Calendar" name="calendar">
            <LeagueCalendar />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LeagueCalendar from './LeagueCalendar';
  import GroupsList from './GroupsList';

  export default {
    name: 'LeaguesOverview',
    components: {
      LeagueCalendar,
      GroupsList,
    },
    data() {
      return {
        activeName: 'calendar',
      };
    },
    computed: {
      leagueOverview() {
        return this.$store.state.leagues?.leagueOverview || {};
      },
      getAreaName() {
        return this.$store.state.leagues.leagueOverview?.area?.name || '';
      },
    },
    /*
     * async mounted() {
     *   await this.getLeagueData();
     * },
     */
    methods: {
      /*
       * getLeagueData() {
       *   const { id } = this.$route.params;
       *   this.$store.dispatch('leagues/GET_LEAGUES_BY_ID', { id });
       * },
       */
      handleClick(tab, event) {},
    },
  };
</script>

<style scoped lang="scss">
  .league-overview-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-image: url('../assets/img/footb.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.7;
  }
</style>
