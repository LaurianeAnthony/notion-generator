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

const IndividualProgressPlan = () => {
  const [csvData] = useState(csvAsObject());
  const [csvKeys] = useState(csvAsKeys());
  const [result, setResult] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const currentWeekKey = getLocalStorage("key:currentWeek");
  const currentWeekValue = getLocalStorage("value:currentWeek");
  const statusKey = getLocalStorage("key:status");
  const [shippedStatus, setShippedStatus] = useState(
    getLocalStorage("i3p:shippedStatus")
      ? getLocalStorage("i3p:shippedStatus").split(",")
      : []
  );
  const [progressStatus, setProgressStatus] = useState(
    getLocalStorage("i3p:progressStatus")
      ? getLocalStorage("i3p:progressStatus").split(",")
      : []
  );
  const [planStatus, setPlanStatus] = useState(
    getLocalStorage("i3p:planStatus")
      ? getLocalStorage("i3p:planStatus").split(",")
      : []
  );

  const [lineStructure, setLineStructure] = useState(
    getLocalStorage("i3p:lineStructure")
      ? getLocalStorage("i3p:lineStructure").split(",")
      : []
  );
  const classes = useStyles();

  useEffect(() => {
    if (csvData.length > 0) {
      const currentWeekTask = filter(
        line => line[currentWeekKey] === currentWeekValue && line.assign,
        csvData
      );

      if (!selectedUser) {
        const users = extractTeamMates(currentWeekTask);
        setUsers(users);
        setSelectedUser(users[0]);
      } else {
        const buildLine = line =>
          `> - ${lineStructure.map(key => line[key]).join(" / ")}`;

        const groupByStatus = compose(
          map(currentStatus => pluck("asString", currentStatus).join("\n")),
          groupBy(line => line[statusKey]),
          map(line => {
            return {
              ...line,
              asString: buildLine(line)
            };
          }),
          filter(line => line.assign.includes(selectedUser))
        )(currentWeekTask);
        console.log(groupByStatus);
        const format = string => (string !== undefined ? `${string}\n` : "");

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
    shippedStatus,
    statusKey
  ]);

  return (
    <div>
      {users.length > 0 && (
        <Select
          labelId="users"
          id="users"
          value={selectedUser}
          onChange={event => setSelectedUser(event.target.value)}
        >
          {users.map(user => (
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
                setLocalStorage("i3p:lineStructure", event.target.value);
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
                  onChange={event => {
                    setShippedStatus(event.target.value);
                    setLocalStorage("i3p:shippedStatus", event.target.value);
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
                    setLocalStorage("i3p:progressStatus", event.target.value);
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
                    setLocalStorage("i3p:planStatus", event.target.value);
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

export default IndividualProgressPlan;
