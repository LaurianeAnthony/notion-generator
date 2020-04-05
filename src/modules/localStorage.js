const PREFIX = "ng:";

export const KEYS = {
  status: "key:status",
  title: "key:title",
  teammates: "key:teammates"
};

export const setLocalStorage = (key, value) =>
  localStorage.setItem(PREFIX + key, value);
export const getLocalStorage = key => localStorage.getItem(PREFIX + key);
