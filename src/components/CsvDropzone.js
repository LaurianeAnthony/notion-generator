import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./shared/Logo";
import CsvButton from "./shared/CsvButton";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  dropZone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: `1px dashed ${theme.palette.grey[500]}`,
    borderRadius: "3px",
    padding: "20px",
    width: "50%",
    minHeight: "300px"
  },
  title: {
    fontWeight: "600"
  },
  subTitle: {
    fontWeight: "300"
  }
}));

const CsvDropzone = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo mt={50} mb={100} fontSize={50} />
      <CsvButton classes={classes}>
        <span className={classes.title}>Drop your backlog here</span>
        <span className={classes.subTitle}>only CSV supported</span>
      </CsvButton>
    </div>
  );
};

export default CsvDropzone;
