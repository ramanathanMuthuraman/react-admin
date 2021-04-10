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

const UserListing = ({ url }) => {
  var classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = React.useState([]);
  useEffect(() => {
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
  return (
    <>
      <div className={classes.actionContainer}>
        <Link className={classes.customLink} to={`${url}/create`}>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Add user
          </Button>
        </Link>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title=""
            upperTitle
            bodyClass={classes.tableWidget}
            disableWidgetMenu
          >
            <Table columns={columns} data={userData} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default UserListing;
