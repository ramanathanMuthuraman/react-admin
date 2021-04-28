import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { useTable, useRowSelect, usePagination } from "react-table";

import { useSnackbar } from "notistack";
import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import useStyles from "./styles";

import useLoader from "../../hooks/useLoader";
import Table from "../../components/Table/Table.js";
import { hooksCallback } from "../../components/Table/utils";

import { PAGE_SIZE } from "../../constants/constants";

import columns from "./columns";

export default function UnassignedAlerts({ user }) {
  var classes = useStyles();
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const [toBeAssignedData, setToBeAssignedData] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const getAlerts = () => {
    setGlobalSpinner(true);
    service({
      method: "get",
      url: urlList.alert,
    })
      .then(function (response = {}) {
        setToBeAssignedData(response.remainingAlertAssignToUsr || []);
        setTotalPageCount(response.totalPage || 0);
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
      data: selectedFlatRows.map((row) => row.values.id),
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
  const { selectedFlatRows, ...tableProps } = useTable(
    {
      columns,
      data: toBeAssignedData,
      initialState: {
        hiddenColumns: ["id", "dateCreated"],
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      },
      pageCount: totalPageCount,
    },
    usePagination,
    useRowSelect,
    hooksCallback,
  );
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
            disabled={!selectedFlatRows || selectedFlatRows.length === 0}
          >
            Assign to myself
          </Button>
        </Grid>
      </Grid>
      <Table {...tableProps} />
    </>
  );
}
