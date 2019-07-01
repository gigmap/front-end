// @flow

import type {GeoPoint} from '../types';

export const API_KEY = process.env.REACT_APP_YANDEX_API_KEY;

export const makeLatLng = (position: number[]): GeoPoint => ({
  lat: position[0],
  lng: position[1]
});

export const makeYaPosition =
  (latLng: GeoPoint): number[] => [latLng.lat, latLng.lng];