import axios from 'axios';

export const createInstance = (
  config,
  errorToString = () => 'Unknown API Error') => {

  const instance = axios.create(config);

  instance.interceptors.response.use(response => {
      if (process.env.NODE_ENV === 'development') {
        console.debug('Got API response', response);
      }
      return response.data;
    },
    error => {
      console.info('Handling error', error);
      let message;

      if (error.response) {
        message = errorToString(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
        message = 'No response from the server';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(error.message);
        message = 'Invalid request settings';
      }

      return Promise.reject({message, original: error});
    });

  return instance;
};