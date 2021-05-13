import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  // TextField,
} from "@material-ui/core";
import { useTable, useRowSelect, usePagination } from "react-table";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useSnackbar } from "notistack";
import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import useLoader from "../../hooks/useLoader";
import { PAGE_SIZE } from "../../constants/constants";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "../../components/Table/Table.js";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import columns from "./columns";
import { hooksCallback } from "../../components/Table/utils";
// import CustomerIdFilter from "../filters/CustomerIdFilter";

// const filters = [
//   {
//     key: "All",
//   },
//   {
//     key: "Unassigned",
//   },
// ];

export default function AlertManagement() {
  var classes = useStyles();
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const [toBeAssignedData, setToBeAssignedData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState(filters[0].key);
  const [togglePopup, setTogglePopup] = useState(false);
  const [isUserAssignLoading, setIsUserAssignLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [selectedCusomerId] = useState(null);
  const isFilteredBasedOnCustomerId = !!selectedCusomerId;
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
  const getUsers = () => {
    service({
      method: "get",
      url: urlList.user,
    })
      .then(function (response = {}) {
        const data = response || [];
        const usersWithAM = data.filter((item) => {
          return item.modules.includes("AM");
        });
        setUserData(usersWithAM);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      });
  };
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
          totalPage = 1;
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

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar]);
  useEffect(() => {
    if (selectedCusomerId !== null) {
      getAlerts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCusomerId]);

  const assignUser = () => {
    setIsUserAssignLoading(true);
    service({
      method: "post",
      url: `${urlList.alert}/${selectedUser}/assign`,
      data: selectedFlatRows.map((row) => row.values.id),
    })
      .then(function () {
        enqueueSnackbar("Assigned successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        setSelectedUser("");
        setTogglePopup(false);
        getAlerts();
      })
      .catch(function () {
        enqueueSnackbar("Failed to assign", {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setIsUserAssignLoading(false);
      });
  };

  const handleClose = () => {
    setTogglePopup(false);
  };

  const onAssign = () => {
    setTogglePopup(true);
  };

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  // const onFilterChange = (event) => {
  //   setSelectedFilter(event.target.value);
  // };

  // const onCusomerIdChange = (value) => {
  //   setSelectedCusomerId(value);
  // };

  return (
    <>
      <PageTitle title="Alert Management" />
      <CustomDialog
        onClose={handleClose}
        open={togglePopup}
        title="Assign user"
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogContentText>
              Assign {selectedFlatRows.length} alerts
            </DialogContentText>
          </Grid>
          <Grid item>
            <DialogContentText className={classes.centerAlignText}>
              {selectedFlatRows.map((row) => row.values.alertId).join(",")}
            </DialogContentText>
          </Grid>

          <Grid item>
            <DialogContentText>to</DialogContentText>
          </Grid>
          <Grid item>
            <Select
              displayEmpty
              labelId="demo-simple-select-label"
              id="demo-simple-select-required"
              value={selectedUser}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select user
              </MenuItem>
              {userData.map((user) => {
                return (
                  <MenuItem key={user.username} value={user.username}>
                    {user.username}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>

        <DialogActions>
          {isUserAssignLoading ? (
            <CircularProgress size={26} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              data-testid="notification-submit-button"
              onClick={assignUser}
              disabled={selectedUser === ""}
            >
              Assign
            </Button>
          )}
        </DialogActions>
      </CustomDialog>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle disableWidgetMenu>
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
                  onClick={onAssign}
                  disabled={!selectedFlatRows || selectedFlatRows.length === 0}
                >
                  Assign user
                </Button>
              </Grid>
              {/* <Grid item>
                <CustomerIdFilter onChange={onCusomerIdChange} />
              </Grid> */}
              {/* <Grid item>
                <TextField
                  className={classes.filterDropdDown}
                  id="filter-alerts"
                  select
                  label="Filter by"
                  value={selectedFilter}
                  onChange={onFilterChange}
                >
                  {filters.map((option) => {
                    return (
                      <MenuItem key={option.key} value={option.key}>
                        {option.key}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid> */}
            </Grid>
            <Table {...tableProps} onPageChangeCallback={getAlerts} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
