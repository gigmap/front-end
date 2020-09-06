export const getUser = state => state.user;

// TODO: not used
export const getUserLocation = (state) => state.user.location;

export const isAuthenticated = (state) => Boolean(state.user.name);