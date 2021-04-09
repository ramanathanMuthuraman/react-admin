import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Input,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";

const allModules = [
  {
    key: "AM",
    value: "Alert Managment",
  },
  {
    key: "CRA",
    value: "Check Risk Assessment",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserGeneration(props) {
  var classes = useStyles();

  const [modules, setModules] = useState([]);

  const handleChange = (event) => {
    setModules(event.target.value);
  };

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
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="username"
                  name="username"
                  label="User name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="middleName"
                  name="middleName"
                  label="Middle name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="empId"
                  name="employeeId"
                  label="Employee ID"
                  fullWidth
                  autoComplete="employee-id"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="mobileno"
                  name="mobileNo"
                  label="Mobile Number"
                  fullWidth
                  autoComplete="mobile-number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.selectHolder}>
                <Select
                  fullWidth
                  labelId="module"
                  id="module"
                  multiple
                  value={modules}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {allModules.map(({ key, value }) => (
                    <MenuItem key={key} value={value}>
                      <Checkbox checked={modules.indexOf(value) > -1} />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}{" "}
                </Select>
              </Grid>
            </Grid>
            <div className={classes.addActionContainer}>
              <Button
                className={classes.addAction}
                variant="contained"
                color="primary"
                onClick={() => {}}
              >
                Submit
              </Button>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
