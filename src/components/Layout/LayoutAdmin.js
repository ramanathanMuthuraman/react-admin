import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route
              exact
              path="/admin"
              render={() => <Redirect to="/admin/dashboard" />}
            />
            <Route path="/admin/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
