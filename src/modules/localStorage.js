const PREFIX = "ng:";

const KEY_PREFIX = "key:";

export const KEYS = {
  status: "key:status",
  title: "key:title",
  teammates: "key:teammates",
  categoryOne: "key:category1",
  categoryTwo: "key:category2"
};

export const setLocalStorage = (key, value) =>
  localStorage.setItem(PREFIX + key, value);
export const getLocalStorage = key => localStorage.getItem(PREFIX + key);
