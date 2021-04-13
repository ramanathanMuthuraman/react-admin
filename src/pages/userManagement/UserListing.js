import React, { useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";

import useStyles from "./styles";
import columns from "./columns";

import Widget from "../../components/Widget/Widget";
import Table from "../../components/Table/Table.js";
import useLoader from "../../hooks/useLoader";

const UserListing = ({ url }) => {
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
            <div className={classes.actionContainer}>
              <Link className={classes.customLink} to={`${url}/create`}>
                <Button variant="contained" color="primary" onClick={() => {}}>
                  Add user
                </Button>
              </Link>
            </div>
            <Table
              columns={columns}
              data={userData}
              hiddenColumns={["modules"]}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default UserListing;
