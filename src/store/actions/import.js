// @flow

import {makeRequest, makeRequestTypes} from './lib';
import {importFromGoogle} from '../../api/gigmap/gigmap';

export const TYPES = {
  IMPORT_GOOGLE: makeRequestTypes('IMPORT:GOOGLE'),
  RESET_GOOGLE: 'IMPORT:GOOGLE:RESET'
};

export const uploadGoogleData = (username: string, html: string) =>
  makeRequest(() => importFromGoogle({username, html}), TYPES.IMPORT_GOOGLE);