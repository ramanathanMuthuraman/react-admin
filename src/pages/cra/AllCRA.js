import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { useTable, useRowSelect, usePagination } from "react-table";

import { useSnackbar } from "notistack";
import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import useStyles from "./styles";

import useLoader from "../../hooks/useLoader";
import Table from "../../components/Table/Table.js";
import { hooksCallback } from "../../components/Table/utils";
import DepartmentFilter from "../filters/DepartmentFilter";

import { PAGE_SIZE } from "../../constants/constants";

import columns from "./columns";

const AllCRA = (props) => {
  var classes = useStyles();
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const [toBeAssignedData, setToBeAssignedData] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const onDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };
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
    }&pageSize=${PAGE_SIZE}&department=${encodeURIComponent(
      selectedDepartment,
    )}`;
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

  useEffect(() => {
    getCRA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageIndex, selectedDepartment]);
  const deleteCRA = () => {
    setGlobalSpinner(true);
    service({
      method: "delete",
      url: `${urlList.cra}`,
      data: selectedFlatRows.map((row) => row.values.id),
    })
      .then(function () {
        setGlobalSpinner(false);
        enqueueSnackbar("Deleted successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        getCRA();
      })
      .catch(function () {
        setGlobalSpinner(false);
        enqueueSnackbar("Failed to delete", {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={4}
        className={classes.actionContainer}
      >
        {props.isCreateAllowed && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.history.push({
                  pathname: "/app/cra/create",
                });
              }}
            >
              Add
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            className={classes.editButton}
            variant="contained"
            color="primary"
            disabled={selectedFlatRows.length !== 1}
            onClick={() => {
              props.history.push({
                pathname: "/app/cra/edit",
                state: { ...selectedFlatRows[0].values },
              });
            }}
          >
            Edit
          </Button>
        </Grid>
        {props.isCreateAllowed && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedFlatRows.length < 1}
              onClick={deleteCRA}
            >
              Delete
            </Button>
          </Grid>
        )}
        <Grid item>
          <DepartmentFilter onChange={onDepartmentChange} />
        </Grid>
      </Grid>

      <Table {...tableProps} />
    </>
  );
};

export default withRouter(AllCRA);
