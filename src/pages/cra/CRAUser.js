import React from "react";
import { Grid } from "@material-ui/core";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import AllCRA from "./AllCRA";

export default function AlertManagement() {
  return (
    <>
      <PageTitle title="CRA" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle disableWidgetMenu>
            <AllCRA createCRA={false} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
