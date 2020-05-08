import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./shared/Logo";
import {
  Paper,
  Grid,
  Select,
  MenuItem,
  Button,
  Link as MuiLink,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import {
  csvAsKeys,
  extractUniqValueOfKey,
  csvAsObject,
} from "../modules/csvFormater";
import CsvDropzone from "./shared/CsvDropzone";
import { setLocalStorage, KEYS } from "../modules/localStorage";
import { Link } from "react-router-dom";
import { defaultSettings } from "../modules/defaultSettings";
import { StateContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperRoot: {
    width: "50%",
    padding: "20px",
    marginBottom: "30px",
  },
  row: {
    marginBottom: "20px",
    alignItems: "center",
  },
  title: {
    marginTop: "0",
    "& small": {
      fontWeight: "300",
    },
  },
  SeparatorText: {
    margin: "0 10px",
  },
  buttons: {
    display: "flex",
    width: "50%",
    justifyContent: "space-around",
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
    marginBottom: "20px",
  },
  csvLoaded: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  defaultSettingsBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ButtonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
}));

const DISPLAY_KEYS = [
  {
    id: KEYS.status,
    label: "Status key",
  },
  {
    id: KEYS.title,
    label: "Title key",
  },
  {
    id: KEYS.teammates,
    label: "Team mates key",
  },
  {
    id: KEYS.category,
    label: "Category key",
  },
];

const CsvGlobalSettings = () => {
  const classes = useStyles();
  const { settings, setSettings } = useContext(StateContext);

  const [csvData, setCsvData] = useState(csvAsObject());
  const [csvKeys, setCsvKeys] = useState(csvAsKeys());

  const [currentWeekValues, setCurrentWeekValues] = useState(
    extractUniqValueOfKey(settings.currentWeek.key)
  );
  const [displayCsvDropzone, setDisplayCsvDropzone] = useState(false);
  // const [displayCustomSettings, setDisplayCustomSettings] = useState(false);

  const updateKey = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const onSelectCurrentWeekKey = (event) => {
    setSettings({
      ...settings,
      currentWeek: {
        ...settings.currentWeek,
        key: event.target.value,
      },
    });
    setCurrentWeekValues(extractUniqValueOfKey(event.target.value));
  };
  const onSelectCurrentWeekValue = (event) => {
    setSettings({
      ...settings,
      currentWeek: {
        ...settings.currentWeek,
        value: event.target.value,
      },
    });
  };

  const setDefaultSettings = (teamName) => {
    setSettings(defaultSettings[teamName]);

    setLocalStorage("settingsType", teamName);
    setLocalStorage("settings", JSON.stringify(defaultSettings[teamName]));
  };

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
            Upload an other file?
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
          <CsvDropzone
            onComplete={() => {
              setCsvData(csvAsObject());
              setCsvKeys(csvAsKeys());
            }}
            classes={classes}
            small
          />
        </React.Fragment>
      )}
      <Paper className={classes.paperRoot}>
        <h2 className={classes.title}>Global settings </h2>

        <div className={classes.defaultSettingsBox}>
          <p>
            Use a default settings{" "}
            <MuiLink
              href="#"
              color="secondary"
              onClick={() => {
                setLocalStorage("settingsType", "custom");
                // setDisplayCustomSettings(true);
              }}
            >
              or customize
            </MuiLink>
          </p>

          <div className={classes.ButtonsWrapper}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setDefaultSettings("affiliates");
              }}
            >
              Affiliates settings
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setDefaultSettings("social");
              }}
            >
              Social settings
            </Button>
          </div>
        </div>

        <Grid container>
          {DISPLAY_KEYS.map((key) => (
            <Grid key={key.id} container className={classes.row}>
              <Grid item xs={6}>
                {key.label}
              </Grid>
              <Grid item xs={6}>
                {csvKeys.length > 0 && (
                  <Select
                    labelId="keys"
                    id="keys"
                    value={settings[key.id]}
                    onChange={(event) => updateKey(key.id, event.target.value)}
                  >
                    {csvKeys.map((csvKey) => (
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
                value={settings.currentWeek.key}
                onChange={onSelectCurrentWeekKey}
              >
                {csvKeys.map((csvKey) => (
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
                value={settings.currentWeek.value}
                onChange={onSelectCurrentWeekValue}
              >
                {currentWeekValues.map((key) => (
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
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/teamprogressplan"
          >
            team 3P
          </Button>
        </div>
      )}
    </div>
  );
};

export default CsvGlobalSettings;
