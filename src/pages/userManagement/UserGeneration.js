import React from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import useLoader from "../../hooks/useLoader";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import UserForm from "./UserForm";

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

export default function UserGeneration() {
  const { enqueueSnackbar } = useSnackbar();
  const { setGlobalSpinner } = useLoader();
  const history = useHistory();

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

  const initialValues = {
    username: "",
    firstname: "",
    lastname: "",
    middlename: "",
    empId: "",
    department: "",
    mobileno: "",
    email: "",
    modules: allModules.map((item) => item.key),
  };

  return <UserForm initialValues={initialValues} saveData={saveData} />;
}
