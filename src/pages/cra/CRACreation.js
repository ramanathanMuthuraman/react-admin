import React from "react";

import { useSnackbar } from "notistack";
import { withRouter } from "react-router-dom";

// components

import useLoader from "../../hooks/useLoader";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import { dateFormatter } from "../../utils/dateUtils";

import CRAForm from "./CRAForm";

const CRAGeneration = (props) => {
  const defaultValues = {
    remarks: "",
    circularRefNo: "",
    circularDate: "",
    regGuidelines: "",
    controlDesc: "",
    breach: "",
    controlEffectiveness: 1,
    monitorMechanism: 1,
    controlAutomation: 1,
    regulatoryImpact: 1,
    processImprovement: "",
    prodName: "",
    policyDetails: "",
    relavantPolicy: "",
    processNote: "",
    sno: "",
  };
  const { enqueueSnackbar } = useSnackbar();
  const { setGlobalSpinner } = useLoader();

  const saveData = (values) => {
    setGlobalSpinner(true);
    const updatedCircularDate = dateFormatter(values.circularDate);

    service({
      method: "post",
      url: urlList.cra,
      data: {
        ...values,
        circularDate: updatedCircularDate,
      },
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

  return <CRAForm initialValues={defaultValues} onSubmitForm={saveData} />;
};

export default withRouter(CRAGeneration);
