import React, { useEffect, useState } from "react";
import { Grid, Button, Select, MenuItem } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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

export default function AlertManagement() {
  var classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [alertsData, setAlertsData] = useState([]);
  const [userData, setUserData] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [togglePopup, setTogglePopup] = useState(false);
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
    service({
      method: "get",
      url: urlList.user,
    })
      .then(function (response = {}) {
        setUserData(response || []);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      });
  }, [enqueueSnackbar]);

  const assignUser = () => {
    service({
      method: "post",
      url: `${urlList.alert}/${selectedUser}/assign`,
      data: selectedRows.map((row) => row.values.alertId),
    })
      .then(function (response = {}) {
        enqueueSnackbar("Assigned successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        setSelectedUser("");
        setTogglePopup(false);
      })
      .catch(function () {
        enqueueSnackbar("Failed to assign", {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  const hooksCallback = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      // Let's make a column for selection
      {
        id: "selection",
        width: 100,
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: (props) => {
          const { getToggleAllRowsSelectedProps } = props;
          const { onChange, ...rest } = getToggleAllRowsSelectedProps();
          const onCheckboxSelectionUpdate = (event) => {
            onChange(event);
          };
          return (
            <div>
              <IndeterminateCheckbox
                {...rest}
                onChange={onCheckboxSelectionUpdate}
              />
            </div>
          );
        },
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: (props) => {
          const { row } = props;
          const { onChange, ...rest } = row.getToggleRowSelectedProps();
          const onCheckboxSelectionUpdate = (event) => {
            onChange(event);
          };
          return (
            <div>
              <IndeterminateCheckbox
                {...rest}
                onChange={onCheckboxSelectionUpdate}
              />
            </div>
          );
        },
      },
      ...columns,
    ]);
  };

  const handleClose = () => {
    setTogglePopup(false);
  };

  const onAssign = () => {
    setTogglePopup(true);
  };

  const onRowSelectionChange = (selectedItems) => {
    setSelectedRows(selectedItems);
  };
  console.log(selectedRows);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <>
      <PageTitle title="Alert management" />
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={togglePopup}
        scroll="paper"
      >
        <DialogTitle id="simple-dialog-title">Assign user</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <DialogContentText>
                Assign {selectedRows.length} alerts
              </DialogContentText>
            </Grid>
            <Grid item>
              <DialogContentText>
                {selectedRows.map((row) => row.values.alertId).join(",")}
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
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            data-testid="notification-submit-button"
            onClick={assignUser}
            disabled={selectedUser === ""}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle disableWidgetMenu>
            <div className={classes.actionContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={onAssign}
                disabled={!selectedRows || selectedRows.length === 0}
              >
                Assign user
              </Button>
            </div>
            <Table
              columns={columns}
              data={alertsData}
              hooksCallback={hooksCallback}
              onRowSelectionChange={onRowSelectionChange}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
