import axios from '../plugins/axios';

export function getLeaguesList() {
  return axios.get('/competitions');
}

export function getLeagueById(id) {
  return axios.get(`/competitions/${id}`);
}
