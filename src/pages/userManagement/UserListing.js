import React, { useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTable, useRowSelect } from "react-table";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";

import useStyles from "./styles";
import columns from "./columns";

import Widget from "../../components/Widget/Widget";
import Table from "../../components/Table/Table.js";
import useLoader from "../../hooks/useLoader";
import { hooksCallback } from "../../components/Table/utils";

const UserListing = ({ url, history }) => {
  const { setGlobalSpinner } = useLoader();
  var classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = React.useState([]);

  useEffect(() => {
    setGlobalSpinner(true);
    service({
      method: "get",
      url: urlList.user,
    })
      .then(function (response = {}) {
        setUserData(response || []);
      })
      .catch(function () {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar]);

  const { selectedFlatRows, ...tableProps } = useTable(
    {
      columns,
      data: userData,
    },
    useRowSelect,
    hooksCallback,
  );
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title=""
            upperTitle
            bodyClass={classes.tableWidget}
            disableWidgetMenu
          >
            <Grid
              container
              spacing={4}
              direction="row"
              className={classes.actionContainer}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedFlatRows.length !== 0}
                  onClick={() => {
                    history.push(`${url}/create`);
                  }}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedFlatRows.length !== 1}
                  onClick={() => {
                    history.push({
                      pathname: `${url}/edit`,
                      state: { ...selectedFlatRows[0].values },
                    });
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
            <Table {...tableProps} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(UserListing);
