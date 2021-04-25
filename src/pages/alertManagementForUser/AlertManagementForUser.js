import React, { useState } from "react";
import { Grid, Tabs, Tab } from "@material-ui/core";
import { useUserState } from "../../context/UserContext";
// styles

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import UnassignedAlerts from "./UnassignedAlerts";
import MyAlerts from "./MyAlerts";

const tabsList = ["Unassigned Alerts", "My alerts"];

export default function AlertManagement() {
  const [selectedTab, setSelectedTab] = useState(0);
  const userProps = useUserState();

  const { user = {} } = userProps;

  return (
    <>
      <PageTitle title="Alert Management" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle disableWidgetMenu>
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
            {selectedTab === 0 ? (
              <UnassignedAlerts user={user} />
            ) : (
              <MyAlerts user={user} />
            )}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
