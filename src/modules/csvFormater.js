import papaparse from "papaparse";
import {
  pluck,
  compose,
  split,
  map,
  flatten,
  uniq,
  replace,
  filter,
  path,
} from "ramda";
import { getLocalStorage } from "./localStorage";

export const csvAsObject = () => {
  const csvAsText = getLocalStorage("csvData");
  return (
    (csvAsText &&
      papaparse.parse(csvAsText, {
        header: true,
        transformHeader: (header) => header.toLowerCase().replace(" ", "_"),
      }).data) ||
    []
  );
};

export const csvAsKeys = () => {
  const csvData = csvAsObject();
  return (csvData && csvData.length > 0 && Object.keys(csvData[0])) || [];
};

export const extractTeamMates = (teamMatesKey) => {
  const csvData = csvAsObject();

  return (
    (csvData &&
      compose(
        uniq(),
        flatten(),
        map(split(",")),
        map(replace(/, /g, ",")),
        filter((string) => string !== ""),
        pluck(teamMatesKey)
      )(csvData)) ||
    []
  );
};

export const extractUniqValueOfKey = (key) => {
  const csvData = csvAsObject();
  return compose(uniq(), pluck(key))(csvData);
};

export const buildLine = (line, type, settings) => {
  const displayTeammate = path([type, "lineFormat", "teammates"], settings);
  const displayStatus = path([type, "lineFormat", "status"], settings);
  const displayCategory = path([type, "lineFormat", "category"], settings);

  const title = settings.title;
  const teammates = settings.teammates;
  const status = settings.status;
  const category = settings.category;

  return `- ${displayCategory ? `[${line[category]}] ` : ""}${
    displayStatus ? `[${line[status]}] ` : ""
  }${line[title]}${displayTeammate ? ` @${line[teammates]}` : ""}`;
};
