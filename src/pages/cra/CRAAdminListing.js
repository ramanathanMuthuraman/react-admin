import React, { useState } from "react";
import { Grid, Tabs, Tab, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AllCRA from "./AllCRA";
import PendingCRA from "./PendingCRA";
import Widget from "../../components/Widget/Widget";
import useStyles from "./styles";

const tabsList = ["All", "Pending"];
const CRAAdminListing = ({ url }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  var classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Widget title="" upperTitle disableWidgetMenu>
          <Grid item>
            <Link className={classes.customLink} to={`${url}/create`}>
              <Button variant="contained" color="primary" onClick={() => {}}>
                Add CRA
              </Button>
            </Link>
          </Grid>
          <Tabs
            value={selectedTab}
            onChange={(event, value) => {
              setSelectedTab(value);
            }}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {tabsList.map((item) => {
              return <Tab key={item} label={item} />;
            })}
          </Tabs>
          {selectedTab === 0 ? <AllCRA /> : <PendingCRA />}
        </Widget>
      </Grid>
    </Grid>
  );
};

export default CRAAdminListing;
