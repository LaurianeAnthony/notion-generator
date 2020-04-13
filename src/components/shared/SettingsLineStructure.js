import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { getLocalStorage, setLocalStorage } from "../../modules/localStorage";
import { csvAsKeys } from "../../modules/csvFormater";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { update } from "ramda";

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
  console.log(localStorageKey);
  const classes = useStyles();
  const [csvKeys] = useState(csvAsKeys());
  const [lineStructure, setLineStructure] = useState(
    getLocalStorage(localStorageKey)
      ? getLocalStorage(localStorageKey).split(",")
      : []
  );
  const [displayTeammate, setDisplayTeammate] = useState(
    getLocalStorage(`${localStorageKey}:teammate`)
  );
  const [displayStatus, setDisplayStatus] = useState(
    getLocalStorage(`${localStorageKey}:status`)
  );
  const [displayCategory, setDisplayCategory] = useState(
    getLocalStorage(`${localStorageKey}:category`)
  );

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
            checked={displayCategory}
            onChange={() => {
              setDisplayCategory(!displayCategory);
              setLocalStorage(`${localStorageKey}:category`, !displayCategory);
            }}
            name="category"
          />
        }
        label="Category"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={displayStatus}
            onChange={() => {
              setDisplayStatus(!displayStatus);
              setLocalStorage(`${localStorageKey}:status`, !displayStatus);
            }}
            name="status"
          />
        }
        label="Status"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={displayTeammate}
            onChange={() => {
              setDisplayTeammate(!displayTeammate);
              setLocalStorage(`${localStorageKey}:teammate`, !displayTeammate);
            }}
            name="teammate"
          />
        }
        label="Teammate"
      />
      <p>
        Preview: {displayCategory && "[category]"} {displayStatus && "[status]"}{" "}
        Title {displayTeammate && "@Teammate"}
      </p>
    </div>
  );
};

export default SettingsLineStructure;
