import qs from 'qs';
import Axios from 'axios';
import { Notification } from 'element-ui';

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'X-Auth-Token': process.env.VUE_APP_API_KEY,
    'common': {
      Accept: 'application/json, text/plain, */*',
    },
  },
});

axios.interceptors.request.use(
  config => {
    config.paramsSerializer = params =>
      qs.stringify(params, {
        encode: false,
        skipNulls: true,
        arrayFormat: 'repeat',
      });

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status !== 404 && error.response.status !== 403) {
      Notification.error({
        message: error.response.data.message,
      });
    } else {
      throw new Error(error);
    }
  },
);

export default axios;
