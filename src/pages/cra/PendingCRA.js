import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
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

const PendingCRA = (props) => {
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
    const CRA_URL = `${urlList.cra}/pending?pageNum=${
      state.pageIndex + 1
    }&pageSize=${PAGE_SIZE}`;
    service({
      method: "get",
      url: CRA_URL,
    })
      .then(function (response = {}) {
        setToBeAssignedData(response.cras || []);
        setTotalPageCount(response.totalPage || 1);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
  };
  // const approveCRA = () => {
  //   setGlobalSpinner(true);
  //   service({
  //     method: "post",
  //     url: `${urlList.cra}/approve`,
  //     data: selectedFlatRows.map((row) => row.values.id),
  //   })
  //     .then(function () {
  //       setGlobalSpinner(false);
  //       enqueueSnackbar("Approved successfully", {
  //         variant: "success",
  //         preventDuplicate: true,
  //       });
  //       getCRA();
  //     })
  //     .catch(function () {
  //       setGlobalSpinner(false);
  //       enqueueSnackbar("Failed to approve", {
  //         variant: "error",
  //         preventDuplicate: true,
  //       });
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
          onClick={() => {
            props.history.push({
              pathname: "/app/cra/edit",
              state: { ...selectedFlatRows[0].values },
              action: "Approve",
            });
          }}
          disabled={selectedFlatRows.length !== 1}
        >
          Approve
        </Button>
      </Grid>
      <Table {...tableProps} onPageChangeCallback={getCRA} />
    </>
  );
};

export default withRouter(PendingCRA);
