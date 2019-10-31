// @flow
import {createInstance} from '../lib';
import type {GetConcertsParams, GoogleImportData} from './types';

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

export const client = createInstance(apiConfig, errorToString);

export const getArtistQty = (username: string): Promise =>
  client.get(`/songkick/artists/count?username=${username}`);

export const getConcerts = (params: GetConcertsParams): Promise =>
  client.get(`/songkick/concerts/list`, {params});

export const importFromGoogle = (data: GoogleImportData): Promise =>
  client.post('/import/google', data);