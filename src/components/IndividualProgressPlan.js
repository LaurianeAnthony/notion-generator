import React, { useState, useEffect, useContext } from "react";
import { groupBy, pluck, filter, compose, map, path } from "ramda";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import {
  csvAsObject,
  extractTeamMates,
  extractUniqValueOfKey,
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

const IndividualProgressPlan = () => {
  const [csvData] = useState(csvAsObject());
  // const [csvKeys] = useState(csvAsKeys());
  const [result, setResult] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const { settings, setSettings } = useContext(StateContext);

  const currentWeekKey = path(["currentWeek", "key"], settings);
  const currentWeekValue = path(["currentWeek", "value"], settings);
  const statusKey = settings.status;
  const shippedStatus = path(["i3p", "shippedStatus"], settings);
  const progressStatus = path(["i3p", "progressStatus"], settings);
  const planStatus = path(["i3p", "planStatus"], settings);
  const lineStructure = path(["t3p", "lineStructure"], settings);

  const classes = useStyles();

  useEffect(() => {
    if (csvData.length > 0) {
      const currentWeekTask = filter(
        (line) => line[currentWeekKey] === currentWeekValue && line.assign,
        csvData
      );

      if (!selectedUser) {
        const users = extractTeamMates(settings.teammates);
        setUsers(users);
        setSelectedUser(users[0]);
      } else {
        const groupByStatus = compose(
          map((currentStatus) => pluck("asString", currentStatus).join("")),
          groupBy((line) => line[statusKey]),
          map((line) => {
            return {
              ...line,
              asString: buildLine(line, "i3p", settings) + "\n",
            };
          }),
          filter((line) => line.assign.includes(selectedUser))
        )(currentWeekTask);

        const format = (string) => (string !== undefined ? `${string}\n` : "");

        const buildShipped = shippedStatus.reduce((acc, status) => {
          if (groupByStatus[status]) {
            acc += format(groupByStatus[status]);
          }
          return acc;
        }, "");

        const buildProgress = progressStatus.reduce((acc, status) => {
          if (groupByStatus[status]) {
            acc += format(groupByStatus[status]);
          }
          return acc;
        }, "");

        const buildPlan = planStatus.reduce((acc, status) => {
          if (groupByStatus[status]) {
            acc += format(groupByStatus[status]);
          }
          return acc;
        }, "");

        setResult(
          `:ship: *Shipped*\n${buildShipped}\n\n:rocket: *Progress*\n${buildProgress}\n\n:airplane: *Plan*\n${buildPlan}\n\n:exploding_head: *Problem*\n> - `
        );
      }
    }
  }, [
    csvData,
    currentWeekKey,
    currentWeekValue,
    lineStructure,
    planStatus,
    progressStatus,
    result,
    selectedUser,
    settings,
    settings.teammates,
    shippedStatus,
    statusKey,
  ]);

  const updateKey = (key, value) => {
    setSettings({
      ...settings,
      i3p: {
        ...settings.i3p,
        [key]: value,
      },
    });
  };

  return (
    <div>
      {users.length > 0 && (
        <Select
          labelId="users"
          id="users"
          value={selectedUser}
          onChange={(event) => setSelectedUser(event.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.replace(" ", "_").toLowerCase()} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
      )}
      <Grid container>
        <Grid item xs={12} md={7}>
          <ResultZone result={result} />
        </Grid>
        <Grid className={classes.settingsGrid} item xs={12} md={5}>
          <h3>Settings</h3>

          <SettingsLineStructure type="i3p" />

          <h4 className={classes.subTitle}>
            Layout <small>Select status to display</small>
          </h4>
          <Grid className={classes.row} container>
            <Grid item xs={3}>
              Shipped
            </Grid>
            <Grid item xs={9}>
              {extractUniqValueOfKey(statusKey).length > 0 && (
                <Select
                  className={classes.input}
                  labelId="shippedStatus"
                  id="shippedStatus"
                  multiple
                  value={shippedStatus}
                  onChange={(event) => {
                    updateKey("shippedStatus", event.target.value);
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

export default IndividualProgressPlan;
