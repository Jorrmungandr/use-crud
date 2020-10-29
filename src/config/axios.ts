import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const defaultConfig = {
  baseURL: REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
};

export default axios.create(defaultConfig);
