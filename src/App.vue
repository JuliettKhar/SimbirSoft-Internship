<template>
  <div id="app">
    <el-container>
      <el-aside>
        <el-menu class="el-menu-vertical" :collapse="isCollapse">
          <el-menu-item v-for="(route, index) in getMenuRoutes" :index="String(index + 1)">
            <router-link :to="{ name: route.name }" :class="isRouterLinkActive(route.name)">
              <i :class="[route.meta.icon, isRouterLinkActive(route.name)]"></i>
            </router-link>
            <span
              slot="title"
              :class="isRouterLinkActive(route.name)"
              @click="navigatePage(route.name)"
              >{{ route.meta.title }}</span
            >
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <i :class="getCurrentIcon" @click="isCollapse = !isCollapse"></i>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import { routes } from './router/routes';

  export default {
    name: 'App',
    data() {
      return {
        isCollapse: true,
        routes,
      };
    },
    computed: {
      getCurrentIcon() {
        return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold';
      },
      getMenuRoutes() {
        return this.routes.filter(route => route.meta.title !== 'Home');
      },
    },
    methods: {
      isRouterLinkActive(name) {
        return name === this.$route.name ? 'router-link-active' : '';
      },
      navigatePage(route) {
        this.$router.push({ name: route });
      },
    },
  };
</script>

<style lang="scss">
  @import 'assets/scss/index.scss';
</style>
