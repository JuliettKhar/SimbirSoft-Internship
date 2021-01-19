<template>
  <div class="">
    <template>
      <div class="">
        <el-row :gutter="20">
          <el-col>
            <ListFilters
              :filters="filters"
              input-placeholder="Type area..."
              @search="searchLeagueByName"
              @pick="searchLeagueByYear"
              @clear="clearPicker"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <LeaguesListTable
              :leagues-data="leaguesListData"
              :loading="loading"
            />
            <el-pagination
              :current-page.sync="currentPage"
              background
              layout="prev, pager, next"
              :total="total"
              hide-on-single-page
              style="margin-top: 20px"
              @current-change="onPaginationChange"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
  import ListFilters from '@/components/Common/ListFilters';
  import LeaguesListTable from '@/components/LeaguesList/LeaguesListTable';
  import { updateQuery } from '@/utils/functions';

  export default {
    name: 'LeaguesList',
    components: {
      ListFilters,
      LeaguesListTable,
    },
    data() {
      const query = this.$route?.query || {};

      return {
        filters: {
          searchInput: query?.searchInput || null,
          pickerData: query?.season || null,
          page: query?.page || 1,
        },
        leaguesData: [],
        currentPage: parseInt(query?.page || 1, 10),
        limit: 10,
        loading: false,
      };
    },
    computed: {
      leaguesList() {
        return this.$store.state.leagues?.leaguesList || [];
      },
      leaguesListData: {
        get() {
          return this.leaguesData;
        },
        set(val) {
          this.leaguesData = val;
        },
      },
      total: {
        get() {
          return this.$store.state.leagues?.leaguesListTotalCount || 0;
        },
        set(val) {
          this.$store.commit('leagues/SET_LEAGUES_LIST_TOTAL_COUNT', val);
        },
      },
    },
    mounted() {
      this.update();
    },
    methods: {
      updateQuery,
      update() {
        this.loading = true;
        this.$store
          .dispatch(`leagues/GET_LEAGUES_LIST`, {
            params: {
              plan: 'TIER_ONE',
            },
          })
          .then(() => this.initList())
          .finally(() => (this.loading = false));
      },
      initList() {
        const start = (this.currentPage - 1) * this.limit;
        const end = start + this.limit;

        this.leaguesData = this.leaguesList.slice(start, end);
      },
      searchLeagueByName() {
        const query = this.updateQuery({ ...this.$route.query });
        query.searchInput = this.filters.searchInput;

        const filtered = this.leaguesList.filter(league => {
          return league.area.name
            .toLowerCase()
            .includes(this.filters.searchInput.toLowerCase());
        });

        this.leaguesListData = Object.assign([], filtered);
        this.$router.push({ query });
        this.total = this.leaguesListData.length;
      },
      searchLeagueByYear() {
        const query = this.updateQuery({ ...this.$route.query });
        query.season = String(new Date(this.filters.pickerData).getFullYear());

        const filteredList = this.filterListByYear(query.season);
        this.leaguesData = Object.assign([], filteredList);
        this.$router.push({ query });
        this.total = this.leaguesListData.length;
      },
      filterListByYear(year) {
        return this.leaguesList.filter(league => {
          if (league.currentSeason) {
            return (
              league.currentSeason.startDate.includes(year) ||
              league.currentSeason.endDate.includes(year)
            );
          }
          return false;
        });
      },
      onPaginationChange() {
        const query = Object.assign(
          {},
          this.updateQuery({ ...this.$route.query }),
        );
        query.page = this.currentPage;
        const start = (this.currentPage - 1) * this.limit;
        const end = start + this.limit;

        this.leaguesListData = Object.assign(
          [],
          this.leaguesList.slice(start, end),
        );
        this.$router.push({ query });
      },
      clearPicker() {
        this.$router.push({});
        this.filters.pickerData = '';
        this.filters.searchInput = '';
        this.update();
      },
    },
  };
</script>

<style scoped lang="scss"></style>
