const PREFIX = "ng:";

export const KEYS = {
  status: "key:status",
  title: "key:title",
  teammates: "key:teammates"
};

export const setLocalStorage = (key, value) =>
  localStorage.setItem(PREFIX + key, value);
export const getLocalStorage = key => localStorage.getItem(PREFIX + key);
export const removeLocalStorage = key => localStorage.removeItem(PREFIX + key);

export const getLocalStorageAsBoolean = key =>
  getLocalStorage(key) === "true" ? true : false;

export const getLocalStorageAsArray = key =>
  getLocalStorage(key) ? getLocalStorage(key).split(",") : [];

export const importAllSettingsFromLocalStorage = () => {
  Object.keys(localStorage).map(key => {
    console.log(localStorage[key]);
  });
};
