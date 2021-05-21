import React from "react";
import { useSnackbar } from "notistack";
import { withRouter } from "react-router-dom";

import useLoader from "../../hooks/useLoader";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import UserForm from "./UserForm";

const UserUpdate = (props) => {
  const initialValues = props.location.state;
  const { enqueueSnackbar } = useSnackbar();
  const { setGlobalSpinner } = useLoader();
  const history = props.history;

  const saveData = (values) => {
    setGlobalSpinner(true);

    service({
      method: "post",
      url: urlList.user,
      data: {
        ...values,
        roleName: "USER",
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

  return <UserForm initialValues={initialValues} saveData={saveData} />;
};

export default withRouter(UserUpdate);
