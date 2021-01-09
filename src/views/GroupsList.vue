<template>
  <div class="groups-list">
    <el-row :gutter="20">
      <el-col>
        <ListFilters :filters="filters" @search="searchTeamsByName" @pick="searchTeamsByYear" />
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
        <el-pagination
          :current-page.sync="currentPage"
          background
          layout="prev, pager, next"
          :total="total"
          hide-on-single-page
          style="margin-top: 20px"
          :current-change="onPaginationChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ListFilters from '../components/Common/ListFilters';
  import { updateQuery } from '@/utils/functions';

  export default {
    name: 'GroupsList',
    components: {
      ListFilters,
    },
    data() {
      const query = this.$route?.query || {};
      return {
        filters: {
          searchInput: query?.searchInput || null,
          pickerData: query?.pickerData || null,
        },
        groupsData: [],
        currentPage: 1,
        limit: 10,
        offset: 0,
      };
    },
    computed: {
      groupsList() {
        return this.$store.state.groups.teamsList?.teams || [];
      },
      groupsListData: {
        get() {
          return this.groupsList;
        },
        set(val) {
          this.groupsData = val;
        },
      },
      total() {
        return this.groupsList.length;
      },
    },
    mounted() {
      this.getGroupsListData();
    },
    methods: {
      updateQuery,
      getGroupsListData() {
        const { id } = this.$route.params;
        this.$store.dispatch('groups/GET_TEAMS_LIST', { id });

        if (JSON.stringify(this.$route.query) !== '{}') {
          this.groupsData = this.filterGroupsByYear(this.$route.query.pickerData);
        } else {
          this.groupsData = Object.assign([], this.groupsList);
        }
      },
      onTeamClick(id) {
        this.$router.push({ name: 'group-calendar', params: { id } });
      },
      searchTeamsByName() {
        const query = Object.assign({}, this.updateQuery(this.filters));
        this.groupsList.filter(group =>
          group.shortName.toLowerCase().includes(this.filters.searchInput.toLowerCase()),
        );
        this.$router.push({ query });
      },
      searchTeamsByYear() {
        const query = Object.assign({}, this.updateQuery(this.filters));
        const { id } = this.$route.params;
        query.pickerData = String(new Date(this.filters.pickerData).getFullYear());
        const params = {
          season: query.pickerData,
        };

        this.$store.dispatch('groups/GET_TEAMS_LIST', { id, params });
        this.$router.push({ query });
      },
      filterGroupsByYear(year) {
        const { pickerData, searchInput } = this.$route.query;
        /*
         * return this.groupsData.filter(group => {
         *   if (!pickerData || !searchInput) {
         *     return (
         *       group.shortName.toLowerCase().includes(searchInput.toLowerCase()) ||
         *       group.shortName.toLowerCase().includes(pickerData.toLowerCase())
         *   }
         *   return group.shortName.toLowerCase().includes(searchInput.toLowerCase())
         * })
         */
      },
      onPaginationChange() {
        this.offset = (this.currentPage - 1) * this.limit;
        const start = this.offset;
        const end = start + this.limit;
        // this.leaguesData = Object.assign([], this.leaguesData.slice(start, end));
        console.log(1);
      },
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
