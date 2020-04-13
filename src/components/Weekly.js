import React, { useState, useEffect } from "react";
import { groupBy, pluck, filter, compose, map, sortBy } from "ramda";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import {
  csvAsObject,
  extractUniqValueOfKey,
  csvAsKeys
} from "../modules/csvFormater";
import ResultZone from "./shared/ResultZone";
import { getLocalStorage, setLocalStorage } from "../modules/localStorage";

const useStyles = makeStyles(() => ({
  settingsGrid: {
    padding: "20px"
  },
  input: {
    width: "100%"
  },
  row: {
    marginBottom: "20px",
    alignItems: "center"
  },
  subTitle: {
    marginTop: "40px",
    marginBottom: "5px",
    "& small": {
      fontWeight: "300"
    }
  }
}));

const Weekly = () => {
  const [csvData] = useState(csvAsObject());
  const [csvKeys] = useState(csvAsKeys());
  const [result, setResult] = useState(null);

  const currentWeekKey = getLocalStorage("key:currentWeek");
  const currentWeekValue = getLocalStorage("value:currentWeek");
  const statusKey = getLocalStorage("key:status");

  const [status, setStatus] = useState(
    getLocalStorage("w:status") ? getLocalStorage("w:status").split(",") : []
  );

  const [lineStructure, setLineStructure] = useState(
    getLocalStorage("t3p:lineStructure")
      ? getLocalStorage("t3p:lineStructure").split(",")
      : []
  );
  const [groupLineBy, setGroupLineBy] = useState(
    getLocalStorage("t3p:groupLineBy")
      ? getLocalStorage("t3p:groupLineBy").split(",")
      : []
  );
  const classes = useStyles();

  useEffect(() => {
    if (csvData.length > 0) {
      const currentWeekTask = filter(
        line => line[currentWeekKey] === currentWeekValue && line.assign,
        csvData
      );

      const buildLine = line =>
        `> - ${lineStructure.map(key => line[key]).join(" / ")}`;

      const groupByCategory = compose(
        map(currentCategory => pluck("asString", currentCategory).join("\n")),
        groupBy(line =>
          line[groupLineBy] !== "" ? line[groupLineBy] : "Divers"
        ),
        sortBy(line => line[groupLineBy]),
        filter(line => status.includes(line[statusKey])),
        map(line => {
          return {
            ...line,
            asString: buildLine(line)
          };
        })
      )(currentWeekTask);
      const format = string => (string !== undefined ? `${string}\n` : "");

      const buildStatus = Object.keys(groupByCategory).reduce(
        (acc, category) => {
          acc += `\n*${category}*\n`;
          if (groupByCategory[category]) {
            acc += format(groupByCategory[category]);
          }
          return acc;
        },
        ""
      );

      setResult(buildStatus);
    }
  }, [
    csvData,
    currentWeekKey,
    currentWeekValue,
    groupLineBy,
    lineStructure,
    result,
    status,
    statusKey
  ]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={7}>
          <ResultZone result={result} />
        </Grid>
        <Grid className={classes.settingsGrid} item xs={12} md={5}>
          <h3>Settings</h3>
          <h4 className={classes.subTitle}>
            Line structure <small>/!\ Select key in order</small>
          </h4>

          {csvKeys.length > 0 && (
            <Select
              className={classes.input}
              labelId="lineStructure"
              id="lineStructure"
              multiple
              value={lineStructure}
              onChange={event => {
                setLineStructure(event.target.value);
                setLocalStorage("t3p:lineStructure", event.target.value);
              }}
            >
              {csvKeys.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}
          <span>Preview: {lineStructure.map(key => key).join(" / ")}</span>

          <h4 className={classes.subTitle}>Group by</h4>

          {csvKeys.length > 0 && (
            <Select
              className={classes.input}
              labelId="groupLineBy"
              id="groupLineBy"
              value={groupLineBy}
              onChange={event => {
                setGroupLineBy(event.target.value);
                setLocalStorage("t3p:groupLineBy", event.target.value);
              }}
            >
              {csvKeys.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}

          <h4 className={classes.subTitle}>Status</h4>
          {extractUniqValueOfKey(statusKey).length > 0 && (
            <Select
              className={classes.input}
              labelId="status"
              id="status"
              multiple
              value={status}
              onChange={event => {
                setStatus(event.target.value);
                setLocalStorage("w:status", event.target.value);
              }}
            >
              {extractUniqValueOfKey(statusKey).map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Weekly;
