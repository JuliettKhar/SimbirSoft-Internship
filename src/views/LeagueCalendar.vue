<template>
  <div class="leagues-calendar">
    <el-row>
      <el-col>
        <CalendarFilter
          :filters="filters"
          @pick="updateCalendar"
          @clear="clearPicker"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <CalendarTable :calendar-data="leagueCalendarData" :loading="loading" />
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          style="margin-top: 20px"
          @current-change="onPaginationChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CalendarFilter from '@/components/Common/CalendarFilter';
  import CalendarTable from '@/components/LeaguesList/CalendarTable';
  import { formatDate, updateQuery, calculatePages } from '@/utils/functions';

  export default {
    name: 'LeaguesCalendar',
    components: { CalendarFilter, CalendarTable },
    data() {
      const query = this.$route?.query || {};
      return {
        filters: {
          pickerData: [query?.dateFrom || '', query?.dateTo || ''],
          page: query?.page || 1,
        },
        currentPage: parseInt(query?.page || 1, 10),
        limit: 10,
        calendarData: [],
        loading: false,
      };
    },
    computed: {
      leagueCalendar() {
        return this.$store.state.leagues.leagueCalendar.matches || [];
      },
      leagueCalendarData: {
        get() {
          return this.calendarData;
        },
        set(val) {
          this.calendarData = val;
        },
      },
      total() {
        return this.$store.state.leagues.leagueCalendar?.total || 0;
      },
    },
    mounted() {
      this.getLeagueData();
    },
    watch: {
      filters: {
        deep: true,
        handler: () => 'update',
      },
    },
    methods: {
      formatDate,
      updateQuery,
      calculatePages,
      update(val) {
        const { id } = this.$route.params;
        this.loading = true;
        this.$store
          .dispatch('leagues/GET_LEAGUES_BY_ID', { id, params: { ...val } })
          .then(() => this.initList())
          .finally(() => (this.loading = false));
      },
      getLeagueData() {
        const { id } = this.$route.params;
        const { page, ...query } = this.$route.query;
        this.loading = true;

        this.$store
          .dispatch('leagues/GET_LEAGUES_BY_ID', { id, params: { ...query } })
          .then(() => this.initList())
          .finally(() => (this.loading = false));
      },
      updateCalendar() {
        const query = this.updateQuery({ ...this.$route.query });
        const dateFrom = this.formatDate(this.filters.pickerData[0], false);
        const dateTo = this.formatDate(this.filters.pickerData[1], false);
        const { id } = this.$route.params;

        query.dateFrom = dateFrom;
        query.dateTo = dateTo;
        this.loading = true;

        this.$store
          .dispatch('leagues/GET_LEAGUES_BY_ID', {
            id,
            params: { dateFrom, dateTo },
          })
          .finally(() => (this.loading = false));
        this.$router.push({ query });
      },
      initList() {
        const { start, end } = this.calculatePages(
          this.currentPage,
          this.limit,
        );

        this.calendarData = Object.assign(
          [],
          this.leagueCalendar.slice(start, end),
        );
      },
      onPaginationChange() {
        const query = this.updateQuery({ ...this.$route.query });
        query.page = this.currentPage;
        const { start, end } = this.calculatePages(
          this.currentPage,
          this.limit,
        );

        this.leagueCalendarData = Object.assign(
          [],
          this.leagueCalendar.slice(start, end),
        );
        this.$router.push({ query });
      },
      clearPicker() {
        this.$router.push({});
        this.filters.pickerData = ['', ''];
        this.filters.searchInput = '';
        this.getLeagueData();
      },
    },
  };
</script>

<style scoped lang="scss">
  .leagues-calendar {
    &__wrapper {
      width: fit-content;
      margin-bottom: 20px;
    }
  }
</style>
