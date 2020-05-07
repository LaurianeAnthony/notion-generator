import {
  csvAsObject,
  csvAsKeys,
  extractTeamMates,
  extractUniqValueOfKey,
  buildLine
} from "./csvFormater";
import { setLocalStorage } from "./localStorage";

const csvAsText =
  'Name,Assign\nCommuniquer les nouvelles url back aux intégrations,"Lauriane Anthony, Nora Lasri"\n[UI] Tab route navigation,"Jeremy Bouche, Lauriane Anthony"';
const csvWithStatus = "Status\nDone\nWaiting\nArchived\nDone\nDoing";
const csvAsTextWithoutAssign =
  'Name,Assign\nCommuniquer les nouvelles url back aux intégrations,\n[UI] Tab route navigation,"Jeremy Bouche, Lauriane Anthony"';

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
    setLocalStorage("key:teammates", "assign");

    expect(extractTeamMates()).toEqual([
      "Lauriane Anthony",
      "Nora Lasri",
      "Jeremy Bouche"
    ]);
  });
  it("get array of team mates without empty assign", () => {
    setLocalStorage("csvData", csvAsTextWithoutAssign);
    setLocalStorage("key:teammates", "assign");

    expect(extractTeamMates()).toEqual(["Jeremy Bouche", "Lauriane Anthony"]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(extractTeamMates(null)).toEqual([]);
  });
  it("get empty array if team mates key is not defined in local storage", () => {
    setLocalStorage("csvData", null);
    setLocalStorage("key:teammates", null);
    expect(extractTeamMates(null)).toEqual([]);
  });
});

describe("extractUniqValueOfKey", () => {
  it("get list of possibilities of value", () => {
    setLocalStorage("csvData", csvWithStatus);
    expect(extractUniqValueOfKey("status")).toEqual([
      "Done",
      "Waiting",
      "Archived",
      "Doing"
    ]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(extractUniqValueOfKey("status")).toEqual([]);
  });
});

describe("buildLine", () => {
  beforeEach(() => {
    setLocalStorage("key:title", "name");
    setLocalStorage("key:teammates", "assign");
    setLocalStorage("key:status", "status");
  });

  it("return string with teammate and status", () => {
    setLocalStorage("i3p:lineStructure:teammate", "true");
    setLocalStorage("i3p:lineStructure:status", "true");

    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      assign: "Lauriane Anthony"
    };

    expect(buildLine(line, "i3p")).toEqual(
      "> - [Doing] Communiquer les nouvelles url back aux intégrations @Lauriane Anthony\n"
    );
  });
  it("return string with teamate", () => {
    setLocalStorage("i3p:lineStructure:teammate", "true");
    setLocalStorage("i3p:lineStructure:status", "false");

    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      assign: "Lauriane Anthony"
    };

    expect(buildLine(line, "i3p")).toEqual(
      "> - Communiquer les nouvelles url back aux intégrations @Lauriane Anthony\n"
    );
  });
  it("return string with status", () => {
    setLocalStorage("i3p:lineStructure:teammate", "false");
    setLocalStorage("i3p:lineStructure:status", "true");

    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      assign: "Lauriane Anthony"
    };

    expect(buildLine(line, "i3p")).toEqual(
      "> - [Doing] Communiquer les nouvelles url back aux intégrations\n"
    );
  });
});
