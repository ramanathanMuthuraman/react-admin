import React from "react";
import { Grid, Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "./components/Table/Table";

export default function Dashboard(props) {
  var classes = useStyles();

  return (
    <>
      <PageTitle
        title="Dashboard"
        button={
          <Button variant="contained" size="medium" color="secondary">
            Latest Reports
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title=""
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
            disableWidgetMenu
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
