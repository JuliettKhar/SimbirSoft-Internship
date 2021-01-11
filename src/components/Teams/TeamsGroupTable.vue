<template>
  <div class="groups-list">
    <div v-if="!loading" class="groups-list__teams">
      <div
        v-for="(team, index) in groupsList"
        :key="index"
        class="groups-list__image-wrapper"
        @click="onTeamClick(team.id)"
      >
        <img
          :src="team.crestUrl"
          :alt="team.shortName"
          class="groups-list__image"
        />
        <span>{{ team.shortName }}</span>
      </div>
    </div>
    <template v-else>
      <p>No Data</p>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'TemsGroupTable',
    props: {
      groupsList: {
        type: Array,
        default: () => [],
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onTeamClick(id) {
        this.$router.push({ name: 'group-calendar', params: { id } });
      },
    },
  };
</script>

<style scoped lang="scss">
  .groups-list {
    &__image {
      width: 100px;
      height: 100px;
      margin-bottom: 10px;
    }

    &__image-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
    }

    &__teams {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
      grid-gap: 1rem;
    }

    p {
      color: #c0c4cc;
    }
  }
</style>
