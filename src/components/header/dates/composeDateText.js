// @flow

import moment, {Moment} from 'moment';

const FORMAT = 'DD MMM YYYY';

export function composeDateText(
  dates: { from: Moment, to: Moment }): string {

  const {from, to} = dates;

  if (from.isSame(to)) {
    return from.format(FORMAT);
  }

  if (from.isSame(moment().startOf('day'))) {
    return `Up to ${to.format(FORMAT)}`;
  }

  if (from.isSame(to, 'month')) {
    return `${from.format('DD')}-${to.format(FORMAT)}`;
  }

  if (from.isSame(to, 'year')) {
    return `${from.format('DD MMM')} - ${to.format(FORMAT)}`;
  }

  return `${from.format(FORMAT)} - ${to.format(FORMAT)}`;
}