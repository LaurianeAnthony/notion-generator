import {
  csvAsObject,
  csvAsKeys,
  extractTeamMates,
  extractUniqvalueOfKey
} from "./csvFormater";
import { setLocalStorage } from "./localStorage";

const csvAsText =
  'Name,Assign\nCommuniquer les nouvelles url back aux intégrations,"Lauriane Anthony, Nora Lasri"\n[UI] Tab route navigation,"Jeremy Bouche, Lauriane Anthony"';
const csvWithStatus = "Status\nDone\nWaiting\nArchived\nDone\nDoing";

describe("csvAsObject", () => {
  it("get csv as object", () => {
    setLocalStorage("csvData", csvAsText);
    expect(csvAsObject()).toEqual([
      {
        name: "Communiquer les nouvelles url back aux intégrations",
        assign: "Lauriane Anthony, Nora Lasri"
      },
      {
        name: "[UI] Tab route navigation",
        assign: "Jeremy Bouche, Lauriane Anthony"
      }
    ]);
  });
  it("Transform header as lower snake case key", () => {
    setLocalStorage("csvData", "Current Week\ntrue");

    expect(csvAsObject()).toEqual([
      {
        current_week: "true"
      }
    ]);
  });
  it("Return empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(csvAsObject()).toEqual([]);
  });
});

describe("csvAsKeys", () => {
  it("get array of keys of an object", () => {
    setLocalStorage("csvData", csvAsText);
    expect(csvAsKeys()).toEqual(["name", "assign"]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(csvAsKeys(null)).toEqual([]);
  });
});

describe("extractTeamMates", () => {
  it("get array of team mates without duplication", () => {
    setLocalStorage("csvData", csvAsText);
    expect(extractTeamMates()).toEqual([
      "Lauriane Anthony",
      "Nora Lasri",
      "Jeremy Bouche"
    ]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(extractTeamMates(null)).toEqual([]);
  });
});

describe("extractUniqValueOfKey", () => {
  it("get list of possibilities of value", () => {
    setLocalStorage("csvData", csvWithStatus);
    expect(extractUniqvalueOfKey("status")).toEqual([
      "Done",
      "Waiting",
      "Archived",
      "Doing"
    ]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(extractUniqvalueOfKey("status")).toEqual([]);
  });
});
