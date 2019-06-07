import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CODES = Object.freeze({
  SONGKICK_USER_NOT_FOUND: 'Songkick user not found - check your username'
});

const errorToString = data => {
  if (data && data.errors && Array.isArray(data.errors)) {
    return data.errors
      .map((it) => CODES[it.code] || `Unexpected error happened`)
      .join(', ');
  }

  return 'Unexpected error happened';
};

const instance = axios.create({
  baseURL: BASE_URL
});

// Add a response interceptor
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

export const api = instance;

export const getArtistQty = (username) =>
  instance.get(`/songkick/artists/count?username=${username}`);

export const getConcerts = ({username}) =>
  instance.get(`/songkick/concerts/list?username=${username}`);