import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./shared/Logo";
import {
  Paper,
  Grid,
  Select,
  MenuItem,
  Button,
  Link as MuiLink
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import {
  csvAsKeys,
  extractUniqValueOfKey,
  csvAsObject
} from "../modules/csvFormater";
import CsvDropzone from "./shared/CsvDropzone";
import {
  setLocalStorage,
  getLocalStorage,
  KEYS
} from "../modules/localStorage";
import { Link } from "react-router-dom";
import { AFFILIATES } from "../modules/defaultSettings";

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
    marginTop: "0",
    "& small": {
      fontWeight: "300"
    }
  },
  SeparatorText: {
    margin: "0 10px"
  },
  buttons: {
    display: "flex",
    width: "50%",
    justifyContent: "space-around"
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
    minHeight: "40px",
    marginBottom: "20px"
  },
  csvLoaded: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px"
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
  }
];

const CsvGlobalSettings = () => {
  const classes = useStyles();

  const [csvData] = useState(csvAsObject());
  const [csvKeys] = useState(csvAsKeys());
  const [stateKeys, setStateKeys] = useState({
    [KEYS.status]: getLocalStorage(KEYS.status),
    [KEYS.title]: getLocalStorage(KEYS.title),
    [KEYS.teammates]: getLocalStorage(KEYS.teammates)
  });
  const [currentWeekKey, setCurrentWeekKey] = useState(
    getLocalStorage("key:currentWeek")
  );
  const [currentWeekValues, setCurrentWeekValues] = useState(
    extractUniqValueOfKey(currentWeekKey)
  );
  const [currentWeekValue, setCurrentWeekValue] = useState(
    getLocalStorage("value:currentWeek")
  );
  const [displayCsvDropzone, setDisplayCsvDropzone] = useState(false);

  const updateKey = (event, key) => {
    setStateKeys({
      ...stateKeys,
      [key]: event.target.value
    });
    setLocalStorage(key, event.target.value);
  };

  const onSelectCurrentWeekKey = event => {
    setCurrentWeekKey(event.target.value);
    setCurrentWeekValues(extractUniqValueOfKey(event.target.value));
    setLocalStorage("key:currentWeek", event.target.value);
  };
  const onSelectCurrentWeekValue = event => {
    setCurrentWeekValue(event.target.value);
    setLocalStorage("value:currentWeek", event.target.value);
  };

  const loadSetOfSettings = settings =>
    settings.map(setting => setLocalStorage(setting.key, setting.value));

  return (
    <div className={classes.root}>
      <Logo mt={50} mb={100} fontSize={50} />

      {csvData.length > 0 && !displayCsvDropzone && (
        <React.Fragment>
          <MuiLink
            href="#"
            color="secondary"
            onClick={() => setDisplayCsvDropzone(true)}
          >
            Want to upload an other file?
          </MuiLink>
          <div className={classes.csvLoaded}>
            <CheckIcon />
            <span>CSV data loaded from your local storage</span>
          </div>
        </React.Fragment>
      )}
      {(!csvData || csvData.length === 0 || displayCsvDropzone) && (
        <React.Fragment>
          {csvData.length > 0 && (
            <MuiLink href="#" onClick={() => setDisplayCsvDropzone(false)}>
              <CloseIcon />
            </MuiLink>
          )}
          <CsvDropzone classes={classes} small />
        </React.Fragment>
      )}
      <Paper className={classes.paperRoot}>
        <h2 className={classes.title}>
          Global settings{" "}
          <small>
            <MuiLink
              color="secondary"
              href="#"
              onClick={() => loadSetOfSettings(AFFILIATES)}
            >
              Use Affiliates default settings
            </MuiLink>
          </small>
        </h2>

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
      {csvData.length > 0 && (
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/individualprogressplan"
          >
            individual 3P
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/weekly"
          >
            weekly team
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default CsvGlobalSettings;
