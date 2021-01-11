<template>
  <el-row :gutter="20" type="flex" justify="start">
    <el-col :sm="8" style="display: flex">
      <el-date-picker
        v-model="filters.pickerData"
        type="year"
        placeholder="Pick a year"
        :clearable="false"
        @change="searchYear"
      ></el-date-picker>
    </el-col>
    <el-col :sm="16" style="display: flex">
      <el-input
        v-model="filters.searchInput"
        :placeholder="inputPlaceholder"
        style="max-width: 591px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchData"
        ></el-button>
      </el-input>
    </el-col>
    <el-col :span="3">
      <el-button type="info" style="margin-left: 10px" @click="$emit('clear')"
        >Clear</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'LeaguesListFilters',
    props: {
      filters: {
        type: Object,
        required: true,
      },
      inputPlaceholder: {
        type: String,
        default: 'Type command name...',
      },
    },
    methods: {
      searchData() {
        this.$emit('search');
      },
      searchYear() {
        this.$emit('pick');
      },
    },
  };
</script>

<style scoped></style>
