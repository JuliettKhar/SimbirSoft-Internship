<template>
  <div class="leagues-calendar">
    <el-row>
      <el-col>
        <CalendarFilter :filters="filters" @pick="updateCalendar" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <CalendarTable :calendar-data="leagueCalendar" />
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          style="margin-top: 20px"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CalendarFilter from '@/components/Common/CalendarFilter';
  import CalendarTable from '@/components/LeaguesList/CalendarTable';
  import { formatDate } from '@/utils/functions';

  export default {
    name: 'LeaguesCalendar',
    components: { CalendarFilter, CalendarTable },
    data() {
      return {
        filters: {
          pickerData: [new Date(), new Date()],
        },
        currentPage: 1,
        limit: 10,
        offset: 0,
        calendarData: [],
      };
    },
    computed: {
      leagueCalendar() {
        return this.$store.state.leagues.leagueCalendar || [];
      },
      leagueCalendarData() {
        return this.calendarData;
      },
      total() {
        return this.leagueCalendar.length;
      },
    },
    methods: {
      formatDate,
      updateCalendar() {
        const dateFrom = this.formatDate(this.filters.pickerData[0], false);
        const dateTo = this.formatDate(this.filters.pickerData[1], false);
        const { id } = this.$route.params;
        const params = { dateFrom, dateTo };

        this.$store.dispatch('leagues/GET_LEAGUES_BY_ID', { id, params });
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
