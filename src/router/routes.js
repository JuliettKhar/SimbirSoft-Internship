import Home from '../views/Home.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'leagues-list' },
    meta: {
      title: 'Home',
    },
    component: Home,
  },
  {
    path: '/leagues-list',
    name: 'leagues-list',
    meta: {
      title: 'Список лиг',
      icon: 'el-icon-trophy',
    },
    component: () => import(/* webpackChunkName: "leagues-list" */ '../views/LeaguesList.vue'),
  },
  {
    path: '/groups-list',
    name: 'groups-list',
    meta: {
      title: 'Список команд',
      icon: 'el-icon-document',
    },
    component: () => import(/* webpackChunkName: "groups-list" */ '../views/GroupsList.vue'),
  },
  {
    path: '/leagues-calendar',
    name: 'leagues-calendar',
    meta: {
      title: 'Календарь лиги',
      icon: 'el-icon-set-up',
    },
    component: () =>
      import(/* webpackChunkName: "leagues-calendar" */ '../views/LeaguesCalendar.vue'),
  },
  {
    path: '/group-calendar',
    name: 'group-calendar',
    meta: {
      title: 'Календарь одной команды',
      icon: 'el-icon-s-grid',
    },
    component: () => import(/* webpackChunkName: "group-calendar" */ '../views/GroupCalendar.vue'),
  },
];
