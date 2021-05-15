import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import CRAAdminListing from "./CRAAdminListing";
import CRACreation from "./CRACreation";
import CRAUpdate from "./CRAUpdate";

export default function AlertManagement() {
  let { path, url } = useRouteMatch();
  return (
    <>
      <PageTitle title="CRA" />
      <Switch>
        <Route exact path={path}>
          <CRAAdminListing url={url} />
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
