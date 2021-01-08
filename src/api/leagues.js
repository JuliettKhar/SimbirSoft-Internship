import axios from '../plugins/axios';

export function getLeaguesList() {
  return axios.get('/competitions');
}

export function getLeagueById(id, params) {
  return axios.get(`/competitions/${id}/matches`, { params });
}

export const apiServiceLeagues = {
  getLeagueById(id, params) {
    return axios.get(`/competitions/${id}/matches`, { params });
  },
  getLeaguesList() {
    return axios.get('/competitions');
  },
};
