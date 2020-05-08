import React, { useContext } from "react";
import { path } from "ramda";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { StateContext } from "../../App";

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

const SettingsLineFormat = ({ type }) => {
  const { settings, setSettings } = useContext(StateContext);
  const { teammates, status, category } = path([type, "lineFormat"], settings);

  const classes = useStyles();

  const updateLineFormat = (key, value) => {
    return setSettings({
      ...settings,
      [type]: {
        ...settings[type],
        lineFormat: { ...settings[type].lineFormat, [key]: value },
      },
    });
  };

  return (
    <div>
      <h4 className={classes.subTitle}>
        Line format <small>What do you want to display ?</small>
      </h4>

      <FormControlLabel
        control={
          <Checkbox
            checked={category}
            onChange={() => {
              updateLineFormat("category", !category);
            }}
            name="category"
          />
        }
        label="Category"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={status}
            onChange={() => {
              updateLineFormat("status", !status);
            }}
            name="status"
          />
        }
        label="Status"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={teammates}
            onChange={() => {
              updateLineFormat("teammates", !teammates);
            }}
            name="teammate"
          />
        }
        label="Teammate"
      />
      <p>
        Preview: {category && "[category]"} {status && "[status]"} Title{" "}
        {teammates && "@Teammate"}
      </p>
    </div>
  );
};

export default SettingsLineFormat;
