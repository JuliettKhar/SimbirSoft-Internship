import Vue from 'vue';
import Vuex from 'vuex';
import leaguesList from './modules/leaguesList';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    leaguesList,
  },
});
