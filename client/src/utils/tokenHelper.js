const localStorageKey = "authToken";

export const setToken = (token) => {
  localStorage.setItem(localStorageKey, token);
};

export const getToken = () => {
  return localStorage.getItem(localStorageKey);
};

export const removeToken = () => {
  localStorage.removeItem(localStorageKey);
};
