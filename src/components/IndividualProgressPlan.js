import React, { useState, useEffect } from "react";
import { groupBy, pluck, filter, compose, map } from "ramda";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { csvAsObject, extractTeamMates } from "../modules/csvFormater";
import ResultZone from "./shared/ResultZone";
import { Grid } from "@material-ui/core";
import { getLocalStorage } from "../modules/localStorage";

const STATUS = {
  TODO: "To do",
  DOING: "Doing",
  REVIEW: "Review",
  WAITING: "Waiting",
  DONE: "Done",
  ARCHIVED: "Archived"
};

const IndividualProgressPlan = () => {
  const [csvData] = useState(csvAsObject());
  const [result, setResult] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (csvData.length > 0) {
      const currentWeekKey = getLocalStorage("key:currentWeek");
      const currentWeekValue = getLocalStorage("value:currentWeek");
      const currentWeekTask = filter(
        line => line[currentWeekKey] === currentWeekValue && line.assign,
        csvData
      );

      if (!selectedUser) {
        const users = extractTeamMates(currentWeekTask);
        setUsers(users);
        setSelectedUser(users[0]);
      } else {
        const groupByStatus = compose(
          map(currentStatus => pluck("asString", currentStatus).join("\n")),
          groupBy(line => line.status),
          map(line => {
            return {
              ...line,
              asString: `> - ${line.app && `[${line.app}]`}${
                line.status === STATUS.REVIEW || line.status === STATUS.WAITING
                  ? `[${line.status}]`
                  : ""
              } ${line.name}`
            };
          }),
          filter(line => line.assign.includes(selectedUser))
        )(currentWeekTask);

        const format = string => (string !== undefined ? `${string}\n` : "");

        setResult(
          `:ship: *Shipped*\n${format(groupByStatus[STATUS.DONE])}${format(
            groupByStatus[STATUS.ARCHIVED]
          )}\n\n:rocket: *Progress*\n${format(
            groupByStatus[STATUS.REVIEW]
          )}${format(
            groupByStatus[STATUS.DOING]
          )}\n\n:airplane: *Plan*\n${format(
            groupByStatus[STATUS.WAITING]
          )}${format(
            groupByStatus[STATUS.TODO]
          )}\n\n:exploding_head: *Problem*\n> - `
        );
      }
    }
  }, [csvData, result, selectedUser]);
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
        <Grid item xs={12} md={5}>
          Settings
        </Grid>
      </Grid>
    </div>
  );
};

export default IndividualProgressPlan;
