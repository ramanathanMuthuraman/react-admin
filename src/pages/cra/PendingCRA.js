import React, { useState } from "react";
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

  const { selectedFlatRows, ...tableProps } = useTable(
    {
      columns,
      data: toBeAssignedData,
      initialState: {
        hiddenColumns: [
          "id",
          "remarks",
          "circularDate",
          "regGuidelines",
          "breach",
          "thresholdName",
          "processImprovement",
          "prodName",
          "policyDetails",
          "relavantPolicy",
          "processNote",
          "sno",
        ],
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

  const getCRA = () => {
    setGlobalSpinner(true);
    const CRA_URL = `${urlList.cra}?pageNum=${
      state.pageIndex + 1
    }&pageSize=${PAGE_SIZE}`;
    service({
      method: "get",
      url: CRA_URL,
    })
      .then(function (response = {}) {
        setToBeAssignedData(response || []);
        setTotalPageCount(1);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
  };
  // const assignUser = () => {
  //   setGlobalSpinner(true);
  //   service({
  //     method: "post",
  //     url: `${urlList.alert}/${user.userName}/assign`,
  //     data: selectedFlatRows.map((row) => row.values.id),
  //   })
  //     .then(function () {
  //       enqueueSnackbar("Assigned successfully", {
  //         variant: "success",
  //         preventDuplicate: true,
  //       });
  //       getAlerts();
  //     })
  //     .catch(function () {
  //       enqueueSnackbar("Failed to assign", {
  //         variant: "error",
  //         preventDuplicate: true,
  //       });
  //     })
  //     .finally(() => {
  //       setGlobalSpinner(true);
  //     });
  // };

  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={4}
        className={classes.actionContainer}
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.editButton}
          onClick={() => {}}
        >
          Approve
        </Button>
      </Grid>
      <Table {...tableProps} onPageChangeCallback={getCRA} />
    </>
  );
}
