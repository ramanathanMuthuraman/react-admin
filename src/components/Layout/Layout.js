import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import { getAllowedRoutes } from "../../utils/routeUtils";
import PrivateRoutesConfig from "../../config/privateRoutesConfig";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { useUserState } from "../../context/UserContext";

function AllowedRoutes({ allowedRoutes }) {
  return (
    <>
      {allowedRoutes.map((route) => {
        const { path, component: Component } = route;
        return <Route key={path} path={path} component={Component} />;
      })}
    </>
  );
}

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  const userProps = useUserState();

  const allowedRoutes = getAllowedRoutes(
    PrivateRoutesConfig,
    userProps.roleName,
  );

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar allowedRoutes={allowedRoutes} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <AllowedRoutes allowedRoutes={allowedRoutes} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
