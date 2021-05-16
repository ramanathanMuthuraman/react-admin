import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// components
import CRAListing from "./CRAListing";
import CRAUpdate from "./CRAUpdate";

export default function AlertManagement() {
  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <CRAListing />
        </Route>
        <Route path={`${path}/edit`}>
          <CRAUpdate />
        </Route>
      </Switch>
    </>
  );
}
