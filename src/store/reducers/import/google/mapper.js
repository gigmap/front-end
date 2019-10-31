import type {ImportEntry, ImportResult} from './types';

const sortOrder = (a: ImportEntry, b: ImportEntry) => {
    return a.googleArtist.title.toLowerCase() > b.googleArtist.title.toLowerCase() ? 1 : -1;
};

export const mapImportEntries = (data: ImportEntry[]): ImportResult => {
  const result = data.reduce((sum, it: ImportEntry) => {
    if (!it.songkickArtist) {
      sum.unknown.push(it);
      return sum;
    }

    it.partialMatch =
      it.googleArtist.title.toLowerCase() !== it.songkickArtist.displayName.toLowerCase();
    it.isTracked ?
      sum.tracked.push(it) :
      sum.untracked.push(it);

    return sum;
  }, {
    tracked: [],
    untracked: [],
    unknown: []
  });

  return  {
    untracked: result.untracked.sort(sortOrder),
    unknown: result.unknown.sort(sortOrder),
    tracked: result.tracked.sort(sortOrder)
  }
};
