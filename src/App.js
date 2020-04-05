import React from "react";
import IndividualProgressPlan from "./components/IndividualProgressPlan";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "./components/shared/Layout";
import CsvDropzone from "./components/CsvDropzone";
import CsvGlobalSettings from "./components/CsvGlobalSettings";
import Weekly from "./components/Weekly";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <div className={classes.root}>
            <Switch>
              <Route exact path="/">
                <CssBaseline />
                <CsvDropzone />
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
              <Route path="/weekly">
                <Layout appBar>
                  <Weekly />
                </Layout>
              </Route>
            </Switch>
          </div>
        </StyledThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
