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
  import { formatDate, updateQuery, calculatePages } from '@/utils/functions';

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
        return this.$store.state.groups.matches?.count || 0;
      },
    },
    mounted() {
      this.getTeamData();
    },
    watch: {
      '$route.query': 'update',
    },
    methods: {
      formatDate,
      updateQuery,
      calculatePages,
      update(val) {
        const { id } = this.$route.params;
        this.$store
          .dispatch('groups/GET_MATCHES', { id, params: { ...val } })
          .then(() => this.initList());
      },
      getTeamData() {
        const { id } = this.$route.params;
        const { page, ...query } = this.$route.query;
        this.$store
          .dispatch('groups/GET_MATCHES', { id, params: { ...query } })
          .then(() => this.initList());
      },
      updateCalendar() {
        const query = this.updateQuery({ ...this.$route.query });
        const dateFrom = this.formatDate(this.filters.pickerData[0], false);
        const dateTo = this.formatDate(this.filters.pickerData[1], false);
        const { id } = this.$route.params;

        query.dateFrom = dateFrom;
        query.dateTo = dateTo;

        this.$store.dispatch('groups/GET_MATCHES', {
          id,
          params: { dateFrom, dateTo },
        });
        this.$router.push({ query });
      },
      initList() {
        const { start, end } = this.calculatePages(
          this.currentPage,
          this.limit,
        );

        this.matchesData = Object.assign([], this.matches.slice(start, end));
      },
      onPaginationChange() {
        const query = this.updateQuery({ ...this.$route.query });
        query.page = this.currentPage;
        const { start, end } = this.calculatePages(
          this.currentPage,
          this.limit,
        );

        this.matchesData = Object.assign([], this.matches.slice(start, end));
        this.$router.push({ query });
      },
      clearPicker() {
        const { dateFrom, dateTo, ...data } = this.$route.query;
        const query = this.updateQuery({ dateFrom: '', dateTo: '', ...data });
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
