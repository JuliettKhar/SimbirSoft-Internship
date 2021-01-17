import { apiServiceLeagues } from '@/api/leagues';

const state = () => ({
  leaguesList: [],
  leagueCalendar: {},
  leagueOverview: [],
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
};
const actions = {
  async GET_LEAGUES_LIST({ commit }, payload) {
    const { data } = await apiServiceLeagues.getLeaguesList(payload);
    commit('SET_LEAGUES_LIST', data.competitions.flat());
  },
  async GET_LEAGUES_BY_ID({ commit }, payload) {
    const { data } = await apiServiceLeagues.getLeagueById(payload);
    const matches = data.matches.flat();
    commit('SET_LEAGUE_CALENDAR', { matches, total: data.count });
    commit('SET_LEAGUE_OVERVIEW', data.competition);
  },
};

export const leagues = {
  namespaced: true,
  state,
  mutations,
  actions,
};
