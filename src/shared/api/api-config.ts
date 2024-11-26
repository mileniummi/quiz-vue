import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['X-Api-Key'] = import.meta.env.VITE_API_KEY;
axios.defaults.paramsSerializer = (params) => qs.stringify(params, {
  arrayFormat: 'comma',
  encode: false,
});

export enum EQueryKeys {
  QuizTags = 'QuizTags',
  QuizCategories = 'QuizCategories',
  Questions = 'Questions'
}
