export const getUser = state => state.user;

export const getUserLocation = (state) => state.user.location;

export const getConcerts = (state) => state.data.concerts;

export const getCountries = (state) => state.data.countries;

export const getArtists = (state) => state.data.artists;

export const getData = (state, key) => state.data[key];

// TODO: move other basic selectors here