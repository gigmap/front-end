import {createInstance} from './lib';

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

const apiConfig = Object.freeze({
  baseURL: BASE_URL
});

export const api = createInstance(apiConfig, errorToString);

export const getArtistQty = (username) =>
  api.get(`/songkick/artists/count?username=${username}`);

export const getConcerts = ({username}) =>
  api.get(`/songkick/concerts/list?username=${username}`);