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

import CustomerIdFilter from "../filters/CustomerIdFilter";

export default function UnassignedAlerts({ user }) {
  var classes = useStyles();
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const [toBeAssignedData, setToBeAssignedData] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [selectedCusomerId, setSelectedCusomerId] = useState(null);
  const isFilteredBasedOnCustomerId = !!selectedCusomerId;
  const onCusomerIdChange = (value) => {
    setSelectedCusomerId(value);
  };

  const { selectedFlatRows, ...tableProps } = useTable(
    {
      columns,
      data: toBeAssignedData,
      initialState: {
        hiddenColumns: ["id", "dateCreated"],
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      },
      manualPagination: true,
      pageCount: totalPageCount,
    },
    usePagination,
    useRowSelect,
    hooksCallback,
  );

  const { state } = tableProps;

  const getAlerts = () => {
    setGlobalSpinner(true);
    const alertsUrl = `${urlList.alert}?pageNum=${
      state.pageIndex + 1
    }&pageSize=${PAGE_SIZE}`;
    const alertsUrlForCustomerId = `${urlList.alert}/${selectedCusomerId}`;
    service({
      method: "get",
      url: isFilteredBasedOnCustomerId ? alertsUrlForCustomerId : alertsUrl,
    })
      .then(function (response = {}) {
        let data, totalPage;
        if (isFilteredBasedOnCustomerId) {
          data = response;
          totalPage = response.length;
        } else {
          data = response.remainingAlertAssignToUsr;
          totalPage = response.totalPage;
        }
        setToBeAssignedData(data || []);
        setTotalPageCount(totalPage || 0);
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
    if (selectedCusomerId !== null) {
      getAlerts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCusomerId]);

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
        <Grid item>
          <CustomerIdFilter onChange={onCusomerIdChange} />
        </Grid>
      </Grid>
      <Table {...tableProps} onPageChangeCallback={getAlerts} />
    </>
  );
}
