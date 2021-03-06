import axios from '../plugins/axios';

export const apiServiceLeagues = {
  getLeagueById({ id, params = {} }) {
    return axios.get(`/competitions/${id}/matches`, { params });
  },
  getLeaguesList({ params = {} }) {
    return axios.get('/competitions', { params });
  },
};
