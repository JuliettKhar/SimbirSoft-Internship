import { apiServiceLeagues } from '@/api/leagues';

const state = () => ({
  leaguesList: [],
  leagueCalendar: {},
  leagueOverview: {},
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
  async GET_LEAGUES_LIST({ commit }) {
    const { data } = await apiServiceLeagues.getLeaguesList();
    const leaguesArray = data.competitions.flat().filter(item => item.plan === 'TIER_ONE');
    commit('SET_LEAGUES_LIST', leaguesArray);
  },
  async GET_LEAGUES_BY_ID({ commit }, id) {
    const { data } = await apiServiceLeagues.getLeagueById(id);
    data.matches.flat();
    commit('SET_LEAGUE_CALENDAR', data);
    commit('SET_LEAGUE_OVERVIEW', data.competition);
  },
};

export const leagues = {
  namespaced: true,
  state,
  mutations,
  actions,
};
