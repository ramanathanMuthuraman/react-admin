import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";

import { useSnackbar } from "notistack";
import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import useStyles from "./styles";

import useLoader from "../../hooks/useLoader";
import Table from "../../components/Table/Table.js";
import { hooksCallback } from "../../components/Table/utils";

import columns from "./columns";

export default function UnassignedAlerts({ user }) {
  var classes = useStyles();
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const [toBeAssignedData, setToBeAssignedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onRowSelectionChange = (selectedItems) => {
    setSelectedRows(selectedItems);
  };

  const getAlerts = () => {
    setGlobalSpinner(true);
    service({
      method: "get",
      url: urlList.alert,
    })
      .then(function (response = {}) {
        setToBeAssignedData(response.remainingAlertAssignToUsr || []);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
  };
  const assignUser = () => {
    setGlobalSpinner(true);
    service({
      method: "post",
      url: `${urlList.alert}/${user.userName}/assign`,
      data: selectedRows.map((row) => row.values.id),
    })
      .then(function () {
        enqueueSnackbar("Assigned successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        getAlerts();
      })
      .catch(function () {
        enqueueSnackbar("Failed to assign", {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setGlobalSpinner(true);
      });
  };
  useEffect(() => {
    getAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar]);
  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={4}
        className={classes.actionContainer}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={assignUser}
            disabled={!selectedRows || selectedRows.length === 0}
          >
            Assign to myself
          </Button>
        </Grid>
      </Grid>
      <Table
        columns={columns}
        data={toBeAssignedData}
        hooksCallback={hooksCallback}
        onRowSelectionChange={onRowSelectionChange}
        hiddenColumns={["id", "dateCreated"]}
      />
    </>
  );
}
