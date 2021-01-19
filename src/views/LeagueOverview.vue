<template>
  <div class="">
    <el-row>
      <el-col :md="12">
        <div class="league-overview-img"></div>
      </el-col>
      <el-col :md="12">
        <template v-if="!isOverviewLoading">
          <i class="el-icon-loading"> </i>
        </template>
        <template v-else>
          <p>
            <el-tag size="medium">{{ leagueOverview.name }}</el-tag>
          </p>
          <p>{{ getAreaName }}</p>
          <p>{{ leagueOverview.startDate }}</p>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="activeTabName" @tab-click="changeTab">
          <el-tab-pane label="Teams" name="groups-list">
            <GroupsList />
          </el-tab-pane>
          <el-tab-pane label="Calendar" name="leagues-calendar">
            <LeagueCalendar />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { updateQuery } from '../utils/functions';

  export default {
    name: 'LeaguesOverview',
    components: {
      LeagueCalendar: () =>
        import(
          /* webpackChunkName: "leagues-calendar" */ '../views/LeagueCalendar.vue'
        ),
      GroupsList: () =>
        import(/* webpackChunkName: "groups-list" */ '../views/GroupsList.vue'),
    },
    data() {
      const activeName = this.$route?.name || 'league-calendar';

      return {
        activeName,
      };
    },
    computed: {
      leagueOverview() {
        return this.$store.state.leagues?.leagueOverview || {};
      },
      getAreaName() {
        return this.$store.state.leagues.leagueOverview?.area?.name || '';
      },
      isOverviewLoading() {
        return this.leagueOverview && this.getAreaName;
      },
      activeTabName: {
        get() {
          return this.activeName;
        },
        set(value) {
          this.activeName = value;
        },
      },
    },
    methods: {
      updateQuery,
      clearFilters() {
        if (JSON.stringify(this.$route.query) === '{}') {
          return;
        } else {
          this.$router.push({ query: {} });
        }
      },
      handleClick() {
        this.clearFilters();
      },
      changeTab({ name }) {
        this.activeName = name;
        this.$router.push({ name });
      },
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
