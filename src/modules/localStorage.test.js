import { setLocalStorage, getLocalStorageAsArray } from "./localStorage";

describe("getLocalStorageAsArray", () => {
  it("get empty array", () => {
    expect(getLocalStorageAsArray("keyArray")).toEqual([]);
  });
  it("get array", () => {
    setLocalStorage("keyArray", "item1,item2,item3");
    expect(getLocalStorageAsArray("keyArray")).toEqual([
      "item1",
      "item2",
      "item3",
    ]);
  });
});
