import React, { useState, useEffect } from "react";
import { groupBy, pluck, filter, compose, map } from "ramda";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import {
  csvAsObject,
  extractTeamMates,
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

const TeamProgressPlan = () => {
  const [csvData] = useState(csvAsObject());
  const [csvKeys] = useState(csvAsKeys());
  const [result, setResult] = useState(null);

  const currentWeekKey = getLocalStorage("key:currentWeek");
  const currentWeekValue = getLocalStorage("value:currentWeek");
  const statusKey = getLocalStorage("key:status");

  const [progressStatus, setProgressStatus] = useState(
    getLocalStorage("t3p:progressStatus")
      ? getLocalStorage("t3p:progressStatus").split(",")
      : []
  );
  const [planStatus, setPlanStatus] = useState(
    getLocalStorage("t3p:planStatus")
      ? getLocalStorage("t3p:planStatus").split(",")
      : []
  );

  const [lineStructure, setLineStructure] = useState(
    getLocalStorage("t3p:lineStructure")
      ? getLocalStorage("t3p:lineStructure").split(",")
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

      const groupByStatus = compose(
        // map(currentStatus => pluck("asString", currentStatus).join("\n")),
        map(currentStatus =>
          compose(
            map(currentProject => pluck("asString", currentProject).join("\n")),
            groupBy(line => (line.project !== "" ? line.project : "Divers"))
          )(currentStatus)
        ),
        groupBy(line => line[statusKey]),
        map(line => {
          return {
            ...line,
            asString: buildLine(line)
          };
        })
      )(currentWeekTask);
      console.log(groupByStatus);
      const format = string => (string !== undefined ? `${string}\n` : "");

      const buildProgress = progressStatus.reduce((acc, status) => {
        if (groupByStatus[status]) {
          acc += Object.keys(groupByStatus[status]).reduce((acc, project) => {
            acc += `*${project}*\n`;
            if (groupByStatus[status][project]) {
              acc += format(groupByStatus[status][project]);
            }
            return acc;
          }, "");
        }
        return acc;
      }, "");
      const buildPlan = planStatus.reduce((acc, status) => {
        if (groupByStatus[status]) {
          acc += Object.keys(groupByStatus[status]).reduce((acc, project) => {
            acc += `*${project}*\n`;
            if (groupByStatus[status][project]) {
              acc += format(groupByStatus[status][project]);
            }
            return acc;
          }, "");
        }
        return acc;
      }, "");

      setResult(
        `:rocket: *Progress*\n${buildProgress}\n\n:airplane: *Plan*\n${buildPlan}\n\n:exploding_head: *Problem*\n> - `
      );
    }
  }, [
    csvData,
    currentWeekKey,
    currentWeekValue,
    lineStructure,
    planStatus,
    progressStatus,
    result,
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
          <h4 className={classes.subTitle}>
            Layout <small>Select status to display</small>
          </h4>
          <Grid className={classes.row} container>
            <Grid item xs={3}>
              Progress
            </Grid>
            <Grid item xs={9}>
              {extractUniqValueOfKey(statusKey).length > 0 && (
                <Select
                  className={classes.input}
                  labelId="progressStatus"
                  id="progressStatus"
                  multiple
                  value={progressStatus}
                  onChange={event => {
                    setProgressStatus(event.target.value);
                    setLocalStorage("t3p:progressStatus", event.target.value);
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
          <Grid className={classes.row} container>
            <Grid item xs={3}>
              Plan
            </Grid>
            <Grid item xs={9}>
              {extractUniqValueOfKey(statusKey).length > 0 && (
                <Select
                  className={classes.input}
                  labelId="planStatus"
                  id="planStatus"
                  multiple
                  value={planStatus}
                  onChange={event => {
                    setPlanStatus(event.target.value);
                    setLocalStorage("t3p:planStatus", event.target.value);
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
        </Grid>
      </Grid>
    </div>
  );
};

export default TeamProgressPlan;
