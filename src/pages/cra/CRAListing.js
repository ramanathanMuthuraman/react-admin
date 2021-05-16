import React, { useState } from "react";
import { Grid, Tabs, Tab } from "@material-ui/core";

import AllCRA from "./AllCRA";
import PendingCRA from "./PendingCRA";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";

const tabsList = ["All", "Pending"];
const CRAListing = ({ isCreateAllowed }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <PageTitle title="Compliance Risk Assessment" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle disableWidgetMenu>
            {isCreateAllowed && (
              <>
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
                  <AllCRA isCreateAllowed={isCreateAllowed} />
                ) : (
                  <PendingCRA />
                )}
              </>
            )}
            {!isCreateAllowed && <AllCRA />}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default CRAListing;
