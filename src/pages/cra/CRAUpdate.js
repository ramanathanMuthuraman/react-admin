import React from "react";

import { useSnackbar } from "notistack";
import { withRouter } from "react-router-dom";

// components

import useLoader from "../../hooks/useLoader";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import { dateFormatter } from "../../utils/dateUtils";

import CRAForm from "./CRAForm";

const CRAUpdate = (props) => {
  const initialValues = props.location.state;
  const { enqueueSnackbar } = useSnackbar();
  const { setGlobalSpinner } = useLoader();

  const saveData = (values) => {
    setGlobalSpinner(true);
    const updatedCircularDate = dateFormatter(values.circularDate);

    service({
      method: "put",
      url: urlList.cra,
      data: [
        {
          ...values,
          circularDate: updatedCircularDate,
        },
      ],
    })
      .then(function () {
        setGlobalSpinner(false);
        enqueueSnackbar("Data saved successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        props.history.push("/app/cra");
      })
      .catch(function () {
        setGlobalSpinner(false);
        enqueueSnackbar("Failed to save data", {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  return <CRAForm initialValues={initialValues} onSubmitForm={saveData} />;
};

export default withRouter(CRAUpdate);
