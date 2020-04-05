import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./shared/Logo";
import { Paper, Grid, Select, MenuItem, Button } from "@material-ui/core";
import { csvAsKeys, extractUniqvalueOfKey } from "../modules/csvFormater";
import {
  setLocalStorage,
  getLocalStorage,
  KEYS
} from "../modules/localStorage";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paperRoot: {
    width: "50%",
    padding: "20px",
    marginBottom: "30px"
  },
  row: {
    marginBottom: "20px",
    alignItems: "center"
  },
  title: {
    marginTop: "0"
  },
  SeparatorText: {
    margin: "0 10px"
  }
}));

const DISPLAY_KEYS = [
  {
    id: KEYS.status,
    label: "Status key"
  },
  {
    id: KEYS.title,
    label: "Title key"
  },
  {
    id: KEYS.teammates,
    label: "Team mates key"
  },
  {
    id: KEYS.categoryOne,
    label: "Category 1 key"
  },
  {
    id: KEYS.categoryTwo,
    label: "Category 2 key"
  }
];

const CsvDropzone = () => {
  const classes = useStyles();

  const [csvKeys] = useState(csvAsKeys());
  const [stateKeys, setStateKeys] = useState({
    [KEYS.status]: getLocalStorage(KEYS.status),
    [KEYS.title]: getLocalStorage(KEYS.title),
    [KEYS.teammates]: getLocalStorage(KEYS.teammates),
    [KEYS.categoryOne]: getLocalStorage(KEYS.categoryOne),
    [KEYS.categoryTwo]: getLocalStorage(KEYS.categoryTwo)
  });
  const [currentWeekKey, setCurrentWeekKey] = useState(
    getLocalStorage("key:currentWeek")
  );
  const [currentWeekValues, setCurrentWeekValues] = useState(
    extractUniqvalueOfKey(currentWeekKey)
  );
  const [currentWeekValue, setCurrentWeekValue] = useState(
    getLocalStorage("value:currentWeek")
  );

  const updateKey = (event, key) => {
    setStateKeys({
      ...stateKeys,
      [key]: event.target.value
    });
    setLocalStorage(key, event.target.value);
  };

  const onSelectCurrentWeekKey = event => {
    setCurrentWeekKey(event.target.value);
    setCurrentWeekValues(extractUniqvalueOfKey(event.target.value));
    setLocalStorage("key:currentWeek", event.target.value);
  };
  const onSelectCurrentWeekValue = event => {
    setCurrentWeekValue(event.target.value);
    setLocalStorage("value:currentWeek", event.target.value);
  };

  console.log(currentWeekValue);

  return (
    <div className={classes.root}>
      <Logo mt={50} mb={100} fontSize={50} />
      <Paper className={classes.paperRoot}>
        <h2 className={classes.title}>Global settings</h2>
        <Grid container>
          {DISPLAY_KEYS.map(key => (
            <Grid key={key.id} container className={classes.row}>
              <Grid item xs={6}>
                {key.label}
              </Grid>
              <Grid item xs={6}>
                {csvKeys.length > 0 && (
                  <Select
                    labelId="keys"
                    id="keys"
                    value={stateKeys[key.id]}
                    onChange={event => updateKey(event, key.id)}
                  >
                    {csvKeys.map(csvKey => (
                      <MenuItem key={csvKey} value={csvKey}>
                        {csvKey}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </Grid>
            </Grid>
          ))}

          <Grid item xs={6}>
            A task is current week if
          </Grid>
          <Grid item xs={6}>
            {csvKeys.length > 0 && (
              <Select
                labelId="keys"
                id="keys"
                value={currentWeekKey}
                onChange={onSelectCurrentWeekKey}
              >
                {csvKeys.map(csvKey => (
                  <MenuItem key={csvKey} value={csvKey}>
                    {csvKey}
                  </MenuItem>
                ))}
              </Select>
            )}
            <span className={classes.SeparatorText}>equals</span>
            {currentWeekValues.length > 0 && (
              <Select
                labelId="keys"
                id="keys"
                value={currentWeekValue}
                onChange={onSelectCurrentWeekValue}
              >
                {currentWeekValues.map(key => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Button variant="contained" component={Link} to="/individualprogressplan">
        Next
      </Button>
    </div>
  );
};

export default CsvDropzone;
