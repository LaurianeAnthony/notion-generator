import React from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";

import Logo from "./Logo";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "70px"
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Logo fontSize={18} mr={20} grey />
          <Button component={Link} to="/individualprogressplan">
            individual 3P
          </Button>
          <Button component={Link} to="/teamprogressplan">
            team 3P
          </Button>
          {/* <Button component={Link} to="/weekly">
            weekly team
          </Button> */}
        </Toolbar>
        <Toolbar>
          <Button color="grey" component={Link} to="/csvsettings">
            <SettingsIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;
