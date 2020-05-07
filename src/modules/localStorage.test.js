import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorageAsBoolean,
  getLocalStorageAsArray,
  importAllSettingsFromLocalStorage
} from "./localStorage";

describe("getLocalStorageAsBoolean", () => {
  it("get true", () => {
    setLocalStorage("keyBoolean", "true");
    expect(getLocalStorageAsBoolean("keyBoolean")).toEqual(true);
  });
});

describe("getLocalStorageAsArray", () => {
  it("get empty array", () => {
    expect(getLocalStorageAsArray("keyArray")).toEqual([]);
  });
  it("get array", () => {
    setLocalStorage("keyArray", "item1,item2,item3");
    expect(getLocalStorageAsArray("keyArray")).toEqual([
      "item1",
      "item2",
      "item3"
    ]);
  });
});

describe("importAllSettingsFromLocalStorage", () => {
  it("get all settings as object", () => {
    removeLocalStorage("keyBoolean");
    removeLocalStorage("keyArray");
    setLocalStorage("key:title", "name");
    setLocalStorage("key:teammates", "assign");
    setLocalStorage("key:status", "status");

    expect(importAllSettingsFromLocalStorage()).toEqual({
      title: "name",
      status: "status",
      teammates: "assign"
    });
  });
});
