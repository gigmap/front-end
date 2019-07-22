export const getUser = state => state.user;

export const getUserLocation = (state) => state.user.location;

export const isAuthenticated = (state) => Boolean(state.user.name);