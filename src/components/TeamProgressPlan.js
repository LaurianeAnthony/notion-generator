import React, { useState, useEffect, useContext } from "react";
import { groupBy, pluck, filter, compose, map, sortBy, path } from "ramda";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import {
  csvAsObject,
  extractUniqValueOfKey,
  csvAsKeys,
  buildLine,
} from "../modules/csvFormater";
import ResultZone from "./shared/ResultZone";
import SettingsLineStructure from "./shared/SettingsLineStructure";
import { StateContext } from "../App";

const useStyles = makeStyles(() => ({
  settingsGrid: {
    padding: "20px",
  },
  input: {
    width: "100%",
  },
  row: {
    marginBottom: "20px",
    alignItems: "center",
  },
  subTitle: {
    marginTop: "40px",
    marginBottom: "5px",
    "& small": {
      fontWeight: "300",
    },
  },
}));

const TeamProgressPlan = () => {
  const [csvData] = useState(csvAsObject());
  const [csvKeys] = useState(csvAsKeys());
  const [result, setResult] = useState(null);
  const { settings, setSettings } = useContext(StateContext);

  const currentWeekKey = path(["currentWeek", "key"], settings);
  const currentWeekValue = path(["currentWeek", "value"], settings);
  const statusKey = settings.status;

  const progressStatus = path(["t3p", "progressStatus"], settings);
  const planStatus = path(["t3p", "planStatus"], settings);
  const groupLineBy = path(["t3p", "groupLineBy"], settings);

  const classes = useStyles();

  useEffect(() => {
    if (csvData.length > 0) {
      const currentWeekTask = filter(
        (line) => line[currentWeekKey] === currentWeekValue && line.assign,
        csvData
      );

      const groupByStatus = compose(
        // map(currentStatus => pluck("asString", currentStatus).join("\n")),
        map((currentStatus) =>
          compose(
            map((currentProject) =>
              pluck("asString", currentProject).join("\n")
            ),
            groupBy((line) =>
              line[groupLineBy] !== "" ? line[groupLineBy] : "Divers"
            ),
            sortBy((line) => line[groupLineBy])
          )(currentStatus)
        ),
        groupBy((line) => line[statusKey]),
        map((line) => {
          return {
            ...line,
            asString: buildLine(line, "t3p", settings),
          };
        })
      )(currentWeekTask);

      const format = (string) => (string !== undefined ? `${string}\n` : "");

      const buildProgress = progressStatus.reduce((acc, status) => {
        if (groupByStatus[status]) {
          acc += Object.keys(groupByStatus[status]).reduce((acc, project) => {
            acc += `\n*${project}*\n`;
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
            acc += `\n*${project}*\n`;
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
    groupLineBy,
    planStatus,
    progressStatus,
    result,
    settings,
    statusKey,
  ]);

  const updateKey = (key, value) => {
    setSettings({
      ...settings,
      t3p: {
        ...settings.t3p,
        [key]: value,
      },
    });
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={7}>
          <ResultZone result={result} />
        </Grid>
        <Grid className={classes.settingsGrid} item xs={12} md={5}>
          <h3>Settings</h3>

          <SettingsLineStructure type="t3p" />

          <h4 className={classes.subTitle}>Group by</h4>

          {csvKeys.length > 0 && (
            <Select
              className={classes.input}
              labelId="groupLineBy"
              id="groupLineBy"
              value={groupLineBy}
              onChange={(event) => {
                updateKey("groupLineBy", event.target.value);
              }}
            >
              {csvKeys.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          )}
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
                  onChange={(event) => {
                    updateKey("progressStatus", event.target.value);
                  }}
                >
                  {extractUniqValueOfKey(statusKey).map((value) => (
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
                  onChange={(event) => {
                    updateKey("planStatus", event.target.value);
                  }}
                >
                  {extractUniqValueOfKey(statusKey).map((value) => (
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
