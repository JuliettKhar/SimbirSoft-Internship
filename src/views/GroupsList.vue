<template>
  <div class="groups-list">
    <el-row :gutter="20">
      <el-col>
        <ListFilters
          :filters="filters"
          @search="searchTeamsByName"
          @pick="searchTeamsByYear"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <TeamsGroupTable :groups-list="groupsListData" />
        <el-pagination
          :current-page.sync="currentPage"
          background
          layout="prev, pager, next"
          :total="total"
          hide-on-single-page
          style="margin-top: 20px"
          @current-change="onPaginationChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ListFilters from '@/components/Common/ListFilters';
  import TeamsGroupTable from '@/components/Teams/TeamsGroupTable';
  import { updateQuery } from '@/utils/functions';

  export default {
    name: 'GroupsList',
    components: {
      ListFilters,
      TeamsGroupTable,
    },
    data() {
      const query = this.$route?.query || {};
      return {
        filters: {
          searchInput: query?.searchInput || null,
          pickerData: query?.pickerData || null,
          pageT: query?.pageT || 1,
        },
        groupsData: [],
        currentPage: parseInt(query?.pageT || 1, 10),
        limit: 12,
      };
    },
    computed: {
      groupsList() {
        return this.$store.state.groups.teamsList?.teams || [];
      },
      groupsListData: {
        get() {
          return this.groupsData;
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
        const { page, ...query } = this.$route.query;

        this.$store
          .dispatch('groups/GET_TEAMS_LIST', { id })
          .then(() => this.initList());

        /*
         * if (JSON.stringify(this.$route.query) !== '{}') {
         *   this.groupsData = this.filterGroupsByYear(
         *     this.$route.query.pickerData,
         *   );
         * } else {
         *   this.groupsData = Object.assign([], this.groupsList);
         * }
         */
      },
      initList() {
        const start = (this.currentPage - 1) * this.limit;
        const end = start + this.limit;

        this.groupsListData = this.groupsList.slice(start, end);
      },
      searchTeamsByName() {
        const query = Object.assign({}, this.updateQuery(this.filters));
        this.groupsList.filter(group =>
          group.shortName
            .toLowerCase()
            .includes(this.filters.searchInput.toLowerCase()),
        );
        this.$router.push({ query });
      },
      searchTeamsByYear() {
        const query = Object.assign({}, this.updateQuery(this.filters));
        const { id } = this.$route.params;
        query.pickerData = String(
          new Date(this.filters.pickerData).getFullYear(),
        );
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
        const query = Object.assign(
          {},
          this.updateQuery({ ...this.$route.query }),
        );
        query.pageT = this.currentPage;
        const start = (this.currentPage - 1) * this.limit;
        const end = start + this.limit;

        this.groupsListData = Object.assign(
          [],
          this.groupsList.slice(start, end),
        );
        this.$router.push({ query });
      },
    },
  };
</script>
