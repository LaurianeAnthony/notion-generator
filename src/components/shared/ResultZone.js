import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";

import { Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
const styles = theme => ({
  resultArea: {
    whiteSpace: "pre-wrap",
    padding: "20px",
    marginTop: "20px",
    width: "100%"
  },
  copyButton: {
    float: "right"
  },
  resultWrapper: {
    display: "flex",
    width: "100%"
  }
});

const ResultZone = ({ classes, result }) => {
  return (
    result && (
      <div className={classes.resultWrapper}>
        <Paper className={classes.resultArea}>
          <CopyToClipboard className={classes.copyButton} text={result}>
            <IconButton aria-label="Copy">
              <FileCopyIcon />
            </IconButton>
          </CopyToClipboard>
          {result}
        </Paper>
      </div>
    )
  );
};

export default withStyles(styles)(ResultZone);
