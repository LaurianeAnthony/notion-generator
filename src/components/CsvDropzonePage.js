import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./shared/Logo";
import CsvDropzone from "./shared/CsvDropzone";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const CsvDropzonePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Logo mt={50} mb={100} fontSize={50} />
      <CsvDropzone big />
    </div>
  );
};

export default CsvDropzonePage;
