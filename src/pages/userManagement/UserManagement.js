// https://medium.com/swlh/defining-nested-routes-with-react-router-8f140e87b360

import React from "react";
import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import UserGeneration from "./UserGeneration.js";
import UserListing from "./UserListing";
import UserUpdate from "./UserUpdate";

const UserManagement = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <PageTitle title="User Management" />
      <Switch>
        <Route exact path={path}>
          <UserListing url={url} />
        </Route>
        <Route path={`${path}/create`}>
          <UserGeneration />
        </Route>
        <Route path={`${path}/edit`}>
          <UserUpdate />
        </Route>
      </Switch>
    </>
  );
};

export default UserManagement;
