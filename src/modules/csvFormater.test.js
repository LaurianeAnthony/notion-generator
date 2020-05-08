import {
  csvAsObject,
  csvAsKeys,
  extractTeamMates,
  extractUniqValueOfKey,
  buildLine,
} from "./csvFormater";
import { setLocalStorage } from "./localStorage";
import { AFFILIATES } from "./defaultSettings";

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
        assign: "Lauriane Anthony, Nora Lasri",
      },
      {
        name: "[UI] Tab route navigation",
        assign: "Jeremy Bouche, Lauriane Anthony",
      },
    ]);
  });
  it("Transform header as lower snake case key", () => {
    setLocalStorage("csvData", "Current Week\ntrue");

    expect(csvAsObject()).toEqual([
      {
        current_week: "true",
      },
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

    expect(extractTeamMates("assign")).toEqual([
      "Lauriane Anthony",
      "Nora Lasri",
      "Jeremy Bouche",
    ]);
  });
  it("get array of team mates without empty assign", () => {
    setLocalStorage("csvData", csvAsTextWithoutAssign);

    expect(extractTeamMates("assign")).toEqual([
      "Jeremy Bouche",
      "Lauriane Anthony",
    ]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(extractTeamMates(null)).toEqual([]);
  });
  it("get empty array if team mates key is not defined in local storage", () => {
    setLocalStorage("csvData", null);
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
      "Doing",
    ]);
  });
  it("get empty array if data null", () => {
    setLocalStorage("csvData", null);
    expect(extractUniqValueOfKey("status")).toEqual([]);
  });
});

describe("buildLine", () => {
  it("return string with teammate and status", () => {
    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      assign: "Lauriane Anthony",
    };

    const settings = {
      ...AFFILIATES,
      i3p: {
        ...AFFILIATES,
        lineFormat: {
          status: true,
          teammates: true,
        },
      },
    };

    expect(buildLine(line, "i3p", settings)).toEqual(
      "- [Doing] Communiquer les nouvelles url back aux intégrations @Lauriane Anthony"
    );
  });
  it("return string with teammate", () => {
    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      assign: "Lauriane Anthony",
    };
    const settings = {
      ...AFFILIATES,
      i3p: {
        ...AFFILIATES,
        lineFormat: {
          status: false,
          teammates: true,
        },
      },
    };

    expect(buildLine(line, "i3p", settings)).toEqual(
      "- Communiquer les nouvelles url back aux intégrations @Lauriane Anthony"
    );
  });
  it("return string with status", () => {
    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      assign: "Lauriane Anthony",
    };

    const settings = {
      ...AFFILIATES,
      i3p: {
        ...AFFILIATES,
        lineFormat: {
          status: true,
          teammates: false,
        },
      },
    };

    expect(buildLine(line, "i3p", settings)).toEqual(
      "- [Doing] Communiquer les nouvelles url back aux intégrations"
    );
  });
  it("return string with status and category", () => {
    const line = {
      name: "Communiquer les nouvelles url back aux intégrations",
      status: "Doing",
      project: "MIDs",
      assign: "Lauriane Anthony",
    };

    const settings = {
      ...AFFILIATES,
      i3p: {
        ...AFFILIATES,
        lineFormat: {
          status: true,
          teammates: false,
          category: true,
        },
      },
    };

    expect(buildLine(line, "i3p", settings)).toEqual(
      "- [MIDs] [Doing] Communiquer les nouvelles url back aux intégrations"
    );
  });
});
