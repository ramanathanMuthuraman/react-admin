import React, { useState } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useTable, useRowSelect, usePagination } from "react-table";
import { useSnackbar } from "notistack";
import { urlList } from "../../config/urlConfig";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import service from "../../utils/serviceUtils";
import useStyles from "./styles";
import useLoader from "../../hooks/useLoader";
import Table from "../../components/Table/Table.js";
import { PAGE_SIZE } from "../../constants/constants";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { hooksCallback } from "../../components/Table/utils";
import columns from "./columns";

const alertStatus = ["Closed", "RFI", "Escalation"];

export default function MyAlerts({ user }) {
  var classes = useStyles();
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);
  const [toBeAssignedData, setToBeAssignedData] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);

  const [selectedStatus, setSelectedStatus] = useState(alertStatus[0]);
  const onUpdateStatus = () => {
    setTogglePopup(true);
  };
  const handleClose = () => {
    setTogglePopup(false);
  };
  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
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
    service({
      method: "get",
      url: `${urlList.alert}/user?user=${user.userName}&pageNum=${
        state.pageIndex + 1
      }&pageSize=${PAGE_SIZE}`,
    })
      .then(function (response = {}) {
        setToBeAssignedData(response.assignedAlerts || []);
        setTotalPageCount(response.totalPage || 0);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
  };
  const updateStatus = () => {
    setIsLoading(true);
    service({
      method: "put",
      url: urlList.alert,
      data: selectedFlatRows.map((row) => {
        return {
          id: row.values.id,
          alertId: row.values.alertId,
          currentStatus: selectedStatus,
        };
      }),
    })
      .then(function () {
        enqueueSnackbar("Updated successfully", {
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
        setIsLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <CustomDialog
        onClose={handleClose}
        open={togglePopup}
        title="Upadate Status"
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogContentText>
              Update {selectedFlatRows.length} alert status
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
              value={selectedStatus}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select status
              </MenuItem>
              {alertStatus.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>

        <DialogActions>
          {isLoading ? (
            <CircularProgress size={26} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              data-testid="notification-submit-button"
              onClick={updateStatus}
            >
              Update
            </Button>
          )}
        </DialogActions>
      </CustomDialog>
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
            onClick={onUpdateStatus}
            disabled={!selectedFlatRows || selectedFlatRows.length === 0}
          >
            Update Status
          </Button>
        </Grid>
      </Grid>
      <Table {...tableProps} onPageChangeCallback={getAlerts} />
    </>
  );
}
