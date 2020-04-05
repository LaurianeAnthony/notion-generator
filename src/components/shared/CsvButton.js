import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import { makeStyles } from "@material-ui/core/styles";
// import Logo from "./Logo";
import { useHistory } from "react-router-dom";
import { setLocalStorage } from "../../modules/localStorage";

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },
//   dropZone: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     border: `1px dashed ${theme.palette.grey[500]}`,
//     borderRadius: "3px",
//     padding: "20px",
//     width: "50%",
//     minHeight: "300px"
//   },
//   title: {
//     fontWeight: "600"
//   },
//   subTitle: {
//     fontWeight: "300"
//   }
// }));

const CsvButton = ({ classes, children }) => {
  //   const classes = useStyles();
  const history = useHistory();

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          setLocalStorage("csvData", reader.result);
          history.push("/csvsettings");
        };
        reader.readAsText(file);
      });
    },
    [history]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={classes.dropZone} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default CsvButton;
