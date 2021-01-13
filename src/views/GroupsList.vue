<template>
  <div class="groups-list">
    <el-row :gutter="20">
      <el-col>
        <ListFilters
          :filters="filters"
          @search="searchTeamsByName"
          @pick="searchTeamsByYear"
          @clear="clearPicker"
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
  import { updateQuery, calculatePages } from '@/utils/functions';

  export default {
    name: 'GroupsList',
    components: { ListFilters, TeamsGroupTable },
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
        return this.$store.state.groups.teamsList?.count || 0;
      },
    },
    mounted() {
      this.getGroupsListData();
    },
    watch: {
      filters: {
        deep: true,
        handler: () => 'update',
      },
    },
    methods: {
      updateQuery,
      calculatePages,
      update(val) {
        const { id } = this.$route.params;
        this.$store
          .dispatch('groups/GET_TEAMS_LIST', { id, params: { ...val } })
          .then(() => this.initList());
      },
      getGroupsListData() {
        const { pageT, ...query } = this.$route.query;
        this.update(query);
      },
      initList() {
        const { start, end } = this.calculatePages(
          this.currentPage,
          this.limit,
        );

        this.groupsListData = Object.assign(
          [],
          this.groupsList.slice(start, end),
        );
      },
      searchTeamsByName() {
        const query = Object.assign({}, this.updateQuery(this.filters));
        this.groupsListData = this.groupsList.filter(group =>
          group.shortName
            .toLowerCase()
            .includes(this.filters.searchInput.toLowerCase()),
        );
        this.$router.push({ query });
      },
      searchTeamsByYear() {
        const query = this.updateQuery({ ...this.$route.query });
        query.season = String(new Date(this.filters.pickerData).getFullYear());

        this.update({ season: query.season });
        this.$router.push({ query });
      },
      onPaginationChange() {
        const query = this.updateQuery({ ...this.$route.query });
        query.pageT = this.currentPage;
        const { start, end } = this.calculatePages(
          this.currentPage,
          this.limit,
        );

        this.groupsListData = Object.assign(
          [],
          this.groupsList.slice(start, end),
        );
        this.$router.push({ query });
      },
      clearPicker() {
        this.$router.push({});
        this.filters.pickerData = '';
        this.filters.searchInput = '';
        this.update({});
      },
    },
  };
</script>
