import { getLeaguesList, getLeagueById } from '@/api/leaguesList';

const state = () => ({
  leaguesList: [],
});
const mutations = {
  SET_LEAGUES_LIST(state, leagues) {
    state.leaguesList = leagues;
  },
};
const actions = {
  async GET_LEAGUES_LIST({ commit }) {
    const { data } = await getLeaguesList();
    const leaguesArray = data.competitions.flat();
    commit('SET_LEAGUES_LIST', leaguesArray);
  },
  async GET_LEAGUES_BY_ID({ commit }, id) {
    const { data } = await getLeagueById(id);
    console.log(data);
  },
};

export const leagues = {
  namespaced: true,
  state,
  mutations,
  actions,
};
