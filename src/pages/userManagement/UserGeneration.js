import React, { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Input,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
} from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import useLoader from "../../hooks/useLoader";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";

const allModules = [
  {
    key: "AM",
    value: "Alert Managment",
  },
  {
    key: "CRA",
    value: "Compliance Risk Assessment",
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
  const { enqueueSnackbar } = useSnackbar();
  const { setGlobalSpinner } = useLoader();
  const history = useHistory();
  const [modules, setModules] = useState(allModules.map((item) => item.value));

  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      setModules(event.target.value);
    }
  };

  const saveData = (values) => {
    setGlobalSpinner(true);

    const selectedModule = allModules
      .map((item) => (modules.includes(item.value) ? item.key : null))
      .filter((item) => !!item);
    service({
      method: "post",
      url: urlList.user,
      data: {
        ...values,
        roleName: "USER",
        modules: selectedModule,
      },
    })
      .then(function () {
        enqueueSnackbar("Data saved successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        history.push("/app");
      })
      .catch(function () {
        enqueueSnackbar("Failed to save data", {
          variant: "error",
          preventDuplicate: true,
        });
      })
      .finally(() => {
        setGlobalSpinner(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      middlename: "",
      empId: "",
      department: "",
      mobileno: "",
      email: "",
    },
    onSubmit: (values) => {
      saveData(values);
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="username"
                    name="username"
                    label="User name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Last name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="middlename"
                    name="middlename"
                    label="Middle name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={formik.handleChange}
                    value={formik.values.middlename}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="empId"
                    name="empId"
                    label="Employee ID"
                    fullWidth
                    autoComplete="employee-id"
                    onChange={formik.handleChange}
                    value={formik.values.empId}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="department"
                    name="department"
                    label="Department"
                    fullWidth
                    autoComplete="Department"
                    onChange={formik.handleChange}
                    value={formik.values.department}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="mobileno"
                    name="mobileno"
                    label="Mobile Number"
                    fullWidth
                    autoComplete="mobile-number"
                    onChange={formik.handleChange}
                    value={formik.values.mobileno}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.selectHolder}>
                  <FormControl className={classes.moduleFormControl}>
                    <InputLabel id="module-label">Module</InputLabel>
                    <Select
                      labelId="module-label"
                      fullWidth
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
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <div className={classes.addActionContainer}>
                <Button
                  className={classes.addAction}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!formik.values.username}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
