import papaparse from "papaparse";
import {
  pluck,
  compose,
  split,
  map,
  flatten,
  uniq,
  replace,
  filter
} from "ramda";
import { getLocalStorage, getLocalStorageAsBoolean } from "./localStorage";

export const csvAsObject = () => {
  const csvAsText = getLocalStorage("csvData");
  return (
    (csvAsText &&
      papaparse.parse(csvAsText, {
        header: true,
        transformHeader: header => header.toLowerCase().replace(" ", "_")
      }).data) ||
    []
  );
};

export const csvAsKeys = () => {
  const csvData = csvAsObject();
  return (csvData && csvData.length > 0 && Object.keys(csvData[0])) || [];
};

export const extractTeamMates = () => {
  const csvData = csvAsObject();
  const teamMatesKey = getLocalStorage("key:teammates");

  return (
    (csvData &&
      compose(
        uniq(),
        flatten(),
        map(split(",")),
        map(replace(/, /g, ",")),
        filter(string => string !== ""),
        pluck(teamMatesKey)
      )(csvData)) ||
    []
  );
};

export const extractUniqValueOfKey = key => {
  const csvData = csvAsObject();
  return compose(uniq(), pluck(key))(csvData);
};

export const buildLine = (line, type) => {
  const displayTeammate = getLocalStorageAsBoolean(
    `${type}:lineStructure:teammate`
  );
  const displayStatus = getLocalStorageAsBoolean(
    `${type}:lineStructure:status`
  );

  console.log("here");
  // const displayCategory = getLocalStorage(`${type}:lineStructure:category`);
  const title = getLocalStorage("key:title");
  const teammates = getLocalStorage("key:teammates");
  const status = getLocalStorage("key:status");

  return `> - ${displayStatus ? `[${line[status]}] ` : ""}${line[title]}${
    displayTeammate ? ` @${line[teammates]}` : ""
  }\n`;
};
