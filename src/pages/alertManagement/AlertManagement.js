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
import Table from "../../components/Table/TableWithSelection";
import columns from "./columns";

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
              <Table columns={columns} data={alertsData} />
            )}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
