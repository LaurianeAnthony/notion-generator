import React, { useState, useEffect } from "react";
import { groupBy, pluck, filter, compose, map } from "ramda";

import withStyles from "@material-ui/core/styles/withStyles";
import ResultZone from "./shared/ResultZone";
import { csvAsObject } from "../modules/csvFormater";

const styles = theme => ({
  textArea: {
    width: "100%",
    marginTop: "20px"
  },
  rootPaper: {
    height: "100VH",
    padding: "20px",
    textAlign: "left"
  },
  rootSelect: {
    marginTop: "30px"
  }
});

const STATUS = {
  TODO: "To do",
  DOING: "Doing",
  REVIEW: "Review",
  WAITING: "Waiting",
  DONE: "Done",
  ARCHIVED: "Archived"
};

const Weekly = ({ classes }) => {
  const [csvData] = useState(csvAsObject());
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (csvData.length > 0) {
      const currentWeekTask = filter(
        line => line.current_week === "Yes",
        csvData
      );

      const groupByStatus = compose(
        map(currentStatus => pluck("asString", currentStatus).join("\n")),
        groupBy(line => line.project),
        map(line => {
          return {
            ...line,
            asString: `> - [${line.project}]${
              line.status === STATUS.REVIEW || line.status === STATUS.WAITING
                ? `[${line.status}]`
                : ""
            } ${line.name}`
          };
        })
      )(currentWeekTask);

      const format = string => (string !== undefined ? `${string}\n` : "");

      setResult(
        `*Recap weekly*\n${format(groupByStatus[STATUS.REVIEW])}${format(
          groupByStatus[STATUS.DOING]
        )}${format(groupByStatus[STATUS.WAITING])}${format(
          groupByStatus[STATUS.TODO]
        )}`
      );
    }
  }, [csvData, result]);

  return (
    <div>
      WIP
      <ResultZone result={result} />
    </div>
  );
};

export default withStyles(styles)(Weekly);
