import { apiServiceLeagues } from '@/api/leagues';
import { Notification } from 'element-ui';

const state = () => ({
  leaguesList: [],
  leagueCalendar: {},
  leagueOverview: [],
  leaguesListTotalCount: 0,
});
const mutations = {
  SET_LEAGUES_LIST(state, leagues) {
    state.leaguesList = leagues;
  },
  SET_LEAGUE_CALENDAR(state, data) {
    state.leagueCalendar = data;
  },
  SET_LEAGUE_OVERVIEW(state, competition) {
    state.leagueOverview = competition;
  },
  SET_LEAGUES_LIST_TOTAL_COUNT(state, total) {
    state.leaguesListTotalCount = total;
  },
};
const actions = {
  async GET_LEAGUES_LIST({ commit }, payload) {
    try {
      const { data } = await apiServiceLeagues.getLeaguesList(payload);
      commit('SET_LEAGUES_LIST', data.competitions.flat());
      commit('SET_LEAGUES_LIST_TOTAL_COUNT', data.count);
    } catch (e) {
      Notification.error({
        message: e.message,
      });
    }
  },
  async GET_LEAGUES_BY_ID({ commit }, payload) {
    try {
      const { data } = await apiServiceLeagues.getLeagueById(payload);
      const matches = data.matches.flat();
      commit('SET_LEAGUE_CALENDAR', { matches, total: data.count });
      commit('SET_LEAGUE_OVERVIEW', data.competition);
    } catch (e) {
      Notification.error({
        message: e.message,
      });
    }
  },
};

export const leagues = {
  namespaced: true,
  state,
  mutations,
  actions,
};
