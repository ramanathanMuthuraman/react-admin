import React from "react";
import { Grid, Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function FileManagement(props) {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="File management" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title=""
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
            disableWidgetMenu
          ></Widget>
        </Grid>
      </Grid>
    </>
  );
}
