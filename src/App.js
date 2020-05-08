import React, { createContext, useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "./components/shared/Layout";
import CsvDropzonePage from "./components/CsvDropzonePage";
import CsvGlobalSettings from "./components/CsvGlobalSettings";
import IndividualProgressPlan from "./components/IndividualProgressPlan";
import TeamProgressPlan from "./components/TeamProgressPlan";
import { setLocalStorage, getLocalStorage } from "./modules/localStorage";
import { defaultSettings } from "./modules/defaultSettings";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#AEAEAE",
      contrastText: "#303030",
    },
    secondary: {
      main: "#94ECFF",
      contrastText: "#303030",
    },
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export const StateContext = createContext();

function App() {
  const classes = useStyles();
  const [settings, setSettings] = useState(
    JSON.parse(getLocalStorage("settings")) || defaultSettings.initial
  );

  useEffect(() => {
    setLocalStorage("settingsType", "custom");
    setLocalStorage("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <StateContext.Provider value={{ settings, setSettings }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <div className={classes.root}>
              <Switch>
                <Route exact path="/">
                  <CssBaseline />
                  <CsvDropzonePage />
                </Route>
                <Route path="/csvsettings">
                  <CssBaseline />
                  <CsvGlobalSettings />
                </Route>
                <Route path="/individualprogressplan">
                  <Layout appBar>
                    <IndividualProgressPlan />
                  </Layout>
                </Route>
                <Route path="/teamprogressplan">
                  <Layout appBar>
                    <TeamProgressPlan />
                  </Layout>
                </Route>
              </Switch>
            </div>
          </StyledThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StateContext.Provider>
  );
}

export default App;
