<template>
  <div class="">
    <template>
      <div class="">
        <el-row :gutter="20">
          <el-col>
            <ListFilters
              :filters="filters"
              @search="searchLeagueEntity"
              @pick="searchLeagueByYear"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <LeaguesListTable
              :leagues-data="leaguesListData"
              :page.sync="currentPage"
              @paginate="onPageChange"
            />
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
          pickerData: query?.pickerData || null,
        },
        leaguesData: [],
        currentPage: 1,
        limit: 10,
        offset: 0,
      };
    },
    computed: {
      leaguesList() {
        return this.$store.state.leagues?.leaguesList || [];
      },
      leaguesListData() {
        return this.leaguesData;
      },
    },
    mounted() {
      this.getLeaguesData();
    },
    methods: {
      updateQuery,
      async getLeaguesData() {
        const params = {
          plan: 'TIER_ONE',
        };
        await this.$store.dispatch(`leagues/GET_LEAGUES_LIST`, params);

        if (JSON.stringify(this.$route.query) !== '{}') {
          this.leaguesData = this.filterListByYear(this.$route.query.pickerData);
        } else {
          this.leaguesData = Object.assign([], this.leaguesList);
        }
      },
      searchLeagueEntity() {
        const query = this.updateQuery(this.filters);
        const filtered = this.leaguesData.filter(league => {
          return league.area.name.toLowerCase().includes(this.filters.searchInput.toLowerCase());
        });

        this.leaguesData = Object.assign([], filtered);
        this.$router.push({ query });
      },
      searchLeagueByYear() {
        const query = Object.assign({}, this.updateQuery(this.filters));
        query.pickerData = String(new Date(this.filters.pickerData).getFullYear());

        const filteredList = this.filterListByYear(query.pickerData);
        this.leaguesData = Object.assign([], filteredList);
        this.$router.push({ query });
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
      onPageChange() {
        this.offset = (this.currentPage - 1) * this.limit;
        const start = this.offset;
        const end = start + this.limit;
        this.leaguesData = Object.assign([], this.leaguesData.slice(start, end));
      },
    },
  };
</script>

<style scoped lang="scss"></style>
