import { apiServiceTeams } from '@/api/groups';

const state = () => ({
  teamsList: {},
  matches: {},
});
const mutations = {
  SET_TEAMS_LIST(state, groups) {
    state.teamsList = groups;
  },
  SET_MATCHES(state, matches) {
    state.matches = matches;
  },
};
const actions = {
  async GET_TEAMS_LIST({ commit }, id) {
    const { data } = await apiServiceTeams.getTeamsList(id);
    console.log(data);
    commit('SET_TEAMS_LIST', data);
  },
  async GET_MATCHES({ commit }, id) {
    const { data } = await apiServiceTeams.getMatches(id);
    commit('SET_MATCHES', data);
  },
};

export const groups = {
  namespaced: true,
  state,
  mutations,
  actions,
};
