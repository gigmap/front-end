export type ImportEntry = {
  googleArtist: {
    id: string,
    title: string,
  },
  isTracked: boolean,
  songkickArtist: {
    id: number,
    displayName: string,
    uri: string,
  } | null,
  partialMatch?: boolean
}

export type ImportResult = {
  tracked: ImportEntry[],
  untracked: ImportEntry[],
  unknown: ImportEntry[]
}