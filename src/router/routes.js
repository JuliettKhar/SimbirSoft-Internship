export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'leagues-list' },
  },
  {
    path: '/leagues-list',
    name: 'leagues-list',
    meta: {
      title: 'List of Leagues',
      icon: 'el-icon-trophy',
    },
    component: () =>
      import(/* webpackChunkName: "leagues-list" */ '../views/LeaguesList.vue'),
  },
  // {
  //   path: '/groups-list',
  //   name: 'groups-list',
  //   meta: {
  //     title: 'Список команд',
  //     icon: 'el-icon-document',
  //   },
  //   component: () => import(/* webpackChunkName: "groups-list" */ '../views/GroupsList.vue'),
  // },
  {
    path: '/leagues-calendar/:id/overview',
    name: 'leagues-overview',
    component: () =>
      import(
        /* webpackChunkName: "leagues-calendar-overview" */ '../views/LeagueOverview'
      ),
  },
  // {
  //   path: '/leagues-calendar/:id',
  //   name: 'leagues-calendar',
  //   meta: {
  //     title: 'Календарь лиги',
  //     icon: 'el-icon-set-up',
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "leagues-calendar" */ '../views/LeagueCalendar.vue'),
  // },
  {
    path: '/group-calendar/:id',
    name: 'group-calendar',
    meta: {
      title: 'Календарь одной команды',
      icon: 'el-icon-s-grid',
    },
    component: () =>
      import(
        /* webpackChunkName: "group-calendar" */ '../views/GroupCalendar.vue'
      ),
  },
];
