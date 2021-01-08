<template>
  <div class="groups-list">
    <el-row :gutter="20">
      <el-col>
        <ListsFilters :filters="filters" @search="searchMatches" @pick="searchMatchesByYear" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="groups-list__teams">
          <div
            v-for="(team, index) in groupsList"
            :key="index"
            class="groups-list__image-wrapper"
            @click="onTeamClick(team.id)"
          >
            <img :src="team.crestUrl" :alt="team.shortName" class="groups-list__image" />
            <span>{{ team.shortName }}</span>
          </div>
        </div>
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
      const query = this.$route?.query || {};
      return {
        filters: {
          searchInput: query?.searchInput || null,
          pickerData: query?.pickerData || null,
        },
      };
    },
    computed: {
      groupsList() {
        return this.$store.state.groups.teamsList?.teams || [];
      },
    },
    mounted() {
      this.getGroupsListData();
    },
    methods: {
      getGroupsListData() {
        const { id } = this.$route.params;
        this.$store.dispatch('groups/GET_TEAMS_LIST', id);
      },
      onTeamClick(id) {
        this.$router.push({ name: 'group-calendar', params: { id } });
      },
      searchMatches() {},
      searchMatchesByYear() {},
    },
  };
</script>

<style scoped lang="scss">
  .groups-list {
    &__image {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }

    &__image-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
    }

    &__teams {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2vw;
    }
  }
</style>
