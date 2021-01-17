<template>
  <div class="leagues-calendar__wrapper">
    <el-date-picker
      v-model="filters.pickerData"
      type="daterange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :clearable="false"
      @change="onPickerChange"
    >
    </el-date-picker>
    <el-button type="info" @click="$emit('clear')">Clear</el-button>
  </div>
</template>

<script>
  export default {
    name: 'CalendarFilter',
    props: {
      filters: {
        type: Object,
        required: true,
      },
    },
    methods: {
      onPickerChange() {
        this.$emit('pick');
      },
    },
  };
</script>

<style scoped lang="scss">
  .leagues-calendar {
    &__wrapper {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      justify-content: start;
      width: fit-content;
      margin-bottom: 20px;

      & > div {
        margin-right: 10px;
        margin-bottom: 10px;
      }

      @include xs {
        justify-content: center;
      }
    }
  }

  .el-range-editor.el-input__inner {
    @include xs {
      width: 100% !important;
    }
  }
</style>
