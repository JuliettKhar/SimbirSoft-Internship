<template>
  <div class="leagues-calendar">
    <el-row>
      <el-col>
        <CalendarFilter :filters="filters" @pick="updateCalendar" @clear="clearPicker" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <TeamsCalendarTable :teams-data="matchesData" />
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
  import CalendarFilter from '@/components/Common/CalendarFilter';
  import TeamsCalendarTable from '@/components/Teams/TeamsCalendarTable';
  import { formatDate, updateQuery } from '@/utils/functions';

  export default {
    name: 'GroupCalendar',
    components: {
      CalendarFilter,
      TeamsCalendarTable,
    },
    data() {
      const query = this.$route?.query || {};

      return {
        filters: {
          pickerData: [query?.dateFrom || '', query?.dateTo || ''],
          page: query?.page || 1,
        },
        currentPage: parseInt(query?.page || 1, 10),
        limit: 10,
        offset: 0,
        matchesList: [],
      };
    },
    computed: {
      matches() {
        return this.$store.state.groups?.matches.matches || [];
      },
      matchesData: {
        get() {
          return this.matchesList;
        },
        set(val) {
          this.matchesList = val;
        },
      },
      total() {
        return this.matches.length;
      },
    },
    mounted() {
      this.getTamData();
    },
    methods: {
      formatDate,
      updateQuery,
      getTamData() {
        const { id } = this.$route.params;
        const { page, ...query } = this.$route.query;
        this.$store
          .dispatch('groups/GET_MATCHES', { id, params: { query } })
          .then(() => this.initList());
      },
      updateCalendar() {
        const query = Object.assign({}, this.updateQuery({ ...this.$route.query }));
        const dateFrom = this.formatDate(this.filters.pickerData[0], false);
        const dateTo = this.formatDate(this.filters.pickerData[1], false);
        const { id } = this.$route.params;

        query.dateFrom = dateFrom;
        query.dateTo = dateTo;

        this.$store.dispatch('groups/GET_MATCHES', { id, params: { dateFrom, dateTo } });
        this.$router.push({ query });
      },
      initList() {
        const start = (this.currentPage - 1) * this.limit;
        const end = start + this.limit;

        this.matchesData = this.matches.slice(start, end);
      },
      onPaginationChange() {
        const query = Object.assign({}, this.updateQuery({ ...this.$route.query }));
        query.page = this.currentPage;
        const start = (this.currentPage - 1) * this.limit;
        const end = start + this.limit;

        this.matchesData = Object.assign([], this.matches.slice(start, end));
        this.$router.push({ query });
      },
      clearPicker() {
        const { dateFrom, dateTo, ...data } = this.$route.query;
        const query = Object.assign({}, this.updateQuery({ dateFrom: '', dateTo: '', ...data }));
        this.$router.push({ query });
        this.filters.pickerData = ['', ''];
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
