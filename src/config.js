const apiUrl = process.env.REACT_APP_API_URL || "";

// API calls append their own paths, so normalize an optional trailing slash.
export const API = apiUrl.replace(/\/+$/, "");
