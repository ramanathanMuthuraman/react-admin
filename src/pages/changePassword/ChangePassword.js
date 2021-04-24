import React from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { Grid, TextField, Button } from "@material-ui/core";

import useLoader from "../../hooks/useLoader";
import { useUserState } from "../../context/UserContext";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";

import useStyles from "./styles";

const schema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Passwords must match",
  ),
});

export default function ChangePassword() {
  var classes = useStyles();
  const userProps = useUserState();

  const { user = {} } = userProps;
  const { setGlobalSpinner } = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const saveData = (values) => {
    setGlobalSpinner(true);
    const { currentPassword, newPassword } = values;
    service({
      method: "put",
      url: urlList.changePassword,
      data: {
        username: user.userName,
        currentPassword,
        newPassword,
      },
    })
      .then(function () {
        enqueueSnackbar("Password changed successfully", {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .catch(function () {
        enqueueSnackbar("Failed to change password", {
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
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      saveData(values);
    },
  });
  return (
    <>
      <PageTitle title="Change Password" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="" upperTitle disableWidgetMenu>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    fullWidth
                    autoComplete="Current Password"
                    onChange={formik.handleChange}
                    value={formik.values.currentPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    fullWidth
                    autoComplete="New Password"
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    error={formik.errors.repeatNewPassword}
                    type="password"
                    id="repeatNewPassword"
                    name="repeatNewPassword"
                    label="Repeat New Password"
                    fullWidth
                    autoComplete="Repeat New Password"
                    onChange={formik.handleChange}
                    helperText={formik.errors.repeatNewPassword}
                    value={formik.values.repeatNewPassword}
                  />
                </Grid>
              </Grid>
              <div className={classes.actionContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
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
