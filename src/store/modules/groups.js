import { apiServiceTeams } from '@/api/groups';
import { Notification } from 'element-ui';

const state = () => ({
  teamsList: {},
  matches: {},
  listTotalCount: 0,
});
const mutations = {
  SET_TEAMS_LIST(state, groups) {
    state.teamsList = groups;
  },
  SET_MATCHES(state, matches) {
    state.matches = matches;
  },
  SET_LIST_TOTAL_COUNT(state, count) {
    state.listTotalCount = count;
  },
};
const actions = {
  async GET_TEAMS_LIST({ commit }, payload) {
    try {
      const { data } = await apiServiceTeams.getTeamsList(payload);
      commit('SET_TEAMS_LIST', data);
      commit('SET_LIST_TOTAL_COUNT', data.count);
    } catch (e) {
      Notification.error({
        message: e.message,
      });
    }
  },
  async GET_MATCHES({ commit }, payload) {
    try {
      const { data } = await apiServiceTeams.getMatches(payload);
      commit('SET_MATCHES', data);
    } catch (e) {
      Notification.error({
        message: e.message,
      });
    }
  },
};

export const groups = {
  namespaced: true,
  state,
  mutations,
  actions,
};
