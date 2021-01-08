import axios from '../plugins/axios';

export const apiServiceTeams = {
  getTeamsList(id, params) {
    return axios.get(`competitions/${id}/teams`, { params });
  },
  getMatches(id, params) {
    return axios.get(`teams/${id}/matches`, { params });
  },
};
