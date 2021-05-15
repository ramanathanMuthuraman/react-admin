import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// components
import CRAAdminListing from "./CRAAdminListing";
import CRACreation from "./CRACreation";
import CRAUpdate from "./CRAUpdate";

export default function AlertManagement() {
  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <CRAAdminListing />
        </Route>
        <Route path={`${path}/create`}>
          <CRACreation />
        </Route>
        <Route path={`${path}/edit`}>
          <CRAUpdate />
        </Route>
      </Switch>
    </>
  );
}
