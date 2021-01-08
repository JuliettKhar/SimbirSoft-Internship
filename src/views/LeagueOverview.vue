<template>
  <div class="">
    <el-row>
      <el-col :md="6">
        <div class="league-overview-img">
          <el-image>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :md="18"></el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Commands" name="commands">
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
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
    height: 150px;
    background-color: #f5f7fa;
  }
</style>
