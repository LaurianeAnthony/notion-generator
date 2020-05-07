import React, { useState, useContext } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  getLocalStorage,
  getLocalStorageAsBoolean,
  setLocalStorage
} from "../../modules/localStorage";
import { csvAsKeys } from "../../modules/csvFormater";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { StateContext } from "../../App";

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

const SettingsLineStructure = ({ type }) => {
  const localStorageKey = `${type}:lineStructure`;

  const { settings, setSettings } = useContext(StateContext);
  console.log(settings);
  //   console.log(type, settings, settings[type].lineFormat);
  const { teammates, status, category } = {};

  const classes = useStyles();
  //   const [csvKeys] = useState(csvAsKeys());
  //   const [lineStructure, setLineStructure] = useState(
  //     getLocalStorage(localStorageKey)
  //       ? getLocalStorage(localStorageKey).split(",")
  //       : []
  //   );
  //   const [displayTeammate, setDisplayTeammate] = useState(
  //     getLocalStorageAsBoolean(`${localStorageKey}:teammate`)
  //   );

  //   const [displayStatus, setDisplayStatus] = useState(
  //     getLocalStorageAsBoolean(`${localStorageKey}:status`)
  //   );
  //   const [displayCategory, setDisplayCategory] = useState(
  //     getLocalStorageAsBoolean(`${localStorageKey}:category`)
  //   );

  const updateLineFormat = (key, value) => {
    console.log(key, value);
    return setSettings({
      ...settings,
      [type]: {
        ...settings[type],
        lineFormat: { ...settings[type].lineFormat, [key]: value }
      }
    });
  };

  return (
    <div>
      <h4 className={classes.subTitle}>
        Line structure <small>What do you want to display ?</small>
      </h4>

      {/* {csvKeys.length > 0 && (
        <Select
          className={classes.input}
          labelId="lineStructure"
          id="lineStructure"
          multiple
          value={lineStructure}
          onChange={event => {
            setLineStructure(event.target.value);
            setLocalStorage(localStorageKey, event.target.value);
          }}
        >
          {csvKeys.map(value => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      )} */}

      <FormControlLabel
        control={
          <Checkbox
            checked={category}
            onChange={() => {
              updateLineFormat("category", !category);
              //   setDisplayCategory(!displayCategory);
              //   setLocalStorage(`${localStorageKey}:category`, !displayCategory);
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
              //   setDisplayStatus(!displayStatus);
              //   setLocalStorage(`${localStorageKey}:status`, !displayStatus);
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
              //   setDisplayTeammate(!displayTeammate);
              //   setLocalStorage(`${localStorageKey}:teammate`, !displayTeammate);
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

export default SettingsLineStructure;
