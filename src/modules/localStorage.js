const PREFIX = "ng:";

export const KEYS = {
  status: "status",
  title: "title",
  teammates: "teammates",
  category: "category",
};

export const setLocalStorage = (key, value) =>
  localStorage.setItem(PREFIX + key, value);
export const getLocalStorage = (key) => localStorage.getItem(PREFIX + key);
export const removeLocalStorage = (key) =>
  localStorage.removeItem(PREFIX + key);

export const getLocalStorageAsArray = (key) =>
  getLocalStorage(key) ? getLocalStorage(key).split(",") : [];
