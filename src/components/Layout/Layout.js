import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import { getAllowedRoutes } from "../../utils/routeUtils";
import PrivateRoutesConfig, {
  otherRoutes,
} from "../../config/privateRoutesConfig";

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

  const { user = {} } = userProps;

  const allowedSidebarRoutes = getAllowedRoutes(
    PrivateRoutesConfig,
    user.roleName,
    user.modules,
  );
  const allRoutes = allowedSidebarRoutes.concat(otherRoutes);

  return (
    <div className={classes.root}>
      <>
        <Header userName={user.userName} history={props.history} />
        <Sidebar allowedRoutes={allowedSidebarRoutes} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <AllowedRoutes allowedRoutes={allRoutes} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
