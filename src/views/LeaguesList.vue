<template>
  <div class="">
    <template>
      <div class="">
        <el-row :gutter="20">
          <el-col>
            <ListsFilters
              :filters="filters"
              @search="searchLeagueEntity"
              @pick="searchLeagueByYear"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <LeaguesListTable :leaguesData="leaguesListData" />
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
  import ListsFilters from '@/components/LeaguesList/ListsFilters';
  import LeaguesListTable from '@/components/LeaguesList/LeaguesListTable';
  import lunr from 'lunr';

  export default {
    name: 'LeaguesList',
    components: {
      ListsFilters,
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
        idx: null,
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
      async getLeaguesData() {
        await this.$store.dispatch(`leagues/GET_LEAGUES_LIST`);

        if (JSON.stringify(this.$route.query) !== '{}') {
          this.leaguesData = this.filterListByYear(this.$route.query.pickerData);
        } else {
          this.leaguesData = Object.assign([], this.leaguesList);
        }
        // this.initIndex();
      },
      updateQuery() {
        const availableProps = {};

        for (const prop in this.filters) {
          if (this.filters[prop]) {
            availableProps[prop] = this.filters[prop];
          }
        }

        return availableProps;
      },
      searchLeagueEntity() {
        const query = this.updateQuery();
        this.$router.push({ query });
      },
      searchLeagueByYear() {
        const query = Object.assign({}, this.updateQuery());
        const year = String(new Date(this.filters.pickerData).getFullYear());
        query.pickerData = year;

        const filteredList = this.filterListByYear(year);
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
      initIndex() {
        this.idx = lunr(() => {
          // this.ref('id');

          this.leaguesListData.forEach(item => {
            console.log(item);
            for (const prop in item) {
              const temp = {};
              temp[prop] = item[prop];
              this.add(temp);
            }
          });
        });
      },
    },
  };
</script>

<style scoped lang="scss"></style>
