const BASE_URL = process.env.REACT_APP_GOOGLE_API_BASE_URL;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const GOOGLE_API_URL = `${BASE_URL}/js?v=3.exp&key=${API_KEY}&libraries=places`;