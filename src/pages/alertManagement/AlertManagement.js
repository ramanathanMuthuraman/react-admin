import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "../../components/Table/Table.js";
import columns from "./columns";
import IndeterminateCheckbox from "../../components/IndeterminateCheckbox/IndeterminateCheckbox";

export default function AlertManagement(props) {
  var classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [alertsData, setAlertsData] = React.useState([]);
  useEffect(() => {
    service({
      method: "get",
      url: urlList.alert,
    })
      .then(function (response = {}) {
        setAlertsData(response.allAlerts || []);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      });
  }, [enqueueSnackbar]);

  const hooksCallback = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      // Let's make a column for selection
      {
        id: "selection",
        width: 100,
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => {
          return (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          );
        },
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  };

  return (
    <>
      <PageTitle title="Alert management" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title=""
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
            disableWidgetMenu
          >
            {alertsData.length !== 0 && (
              <Table
                columns={columns}
                data={alertsData}
                hooksCallback={hooksCallback}
              />
            )}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
