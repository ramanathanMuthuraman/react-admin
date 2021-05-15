import React from "react";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import useLoader from "../../hooks/useLoader";
import DateInput from "../../components/DateRender/DateInput";

import { urlList } from "../../config/urlConfig";
import service from "../../utils/serviceUtils";
import {
  CONTROL_EFFECTIVENESS,
  MONITORING_MECHANISM,
  REGULATORY_IMPACT,
  CONTROL_AUTOMATION,
} from "../../constants/constants";

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
  const initialValues = props.location.state
    ? props.location.state
    : defaultValues;
  var classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setGlobalSpinner } = useLoader();

  const saveData = (values) => {
    setGlobalSpinner(true);
    service({
      method: "post",
      url: urlList.cra,
      data: [
        {
          ...values,
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

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={saveData}>
        {(props) => {
          const { handleChange, values, handleSubmit } = props;
          return (
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Widget
                  title=""
                  upperTitle
                  bodyClass={classes.tableWidget}
                  disableWidgetMenu
                >
                  <form>
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="remarks"
                          name="remarks"
                          label="Remarks"
                          fullWidth
                          autoComplete="given-name"
                          onChange={handleChange}
                          value={values.remarks}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="circularRefNo"
                          name="circularRefNo"
                          label="Circular Ref No"
                          fullWidth
                          autoComplete="given-name"
                          onChange={handleChange}
                          value={values.circularRefNo}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DateInput
                          id="circularDate"
                          name="circularDate"
                          label="Circular Date"
                          fullWidth
                          autoComplete="given-name"
                          onChange={handleChange}
                          value={values.circularDate}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="regGuidelines"
                          name="regGuidelines"
                          label="Reg Guidelines"
                          fullWidth
                          autoComplete="given-name"
                          onChange={handleChange}
                          value={values.regGuidelines}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="controlDesc"
                          name="controlDesc"
                          label="Control Desc"
                          fullWidth
                          autoComplete="employee-id"
                          onChange={handleChange}
                          value={values.controlDesc}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="breach"
                          name="breach"
                          label="Breach"
                          fullWidth
                          autoComplete="breach"
                          onChange={handleChange}
                          value={values.breach}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="processImprovement"
                          name="processImprovement"
                          label="Process Improvement"
                          fullWidth
                          autoComplete="mobile-number"
                          onChange={handleChange}
                          value={values.processImprovement}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="prodName"
                          name="prodName"
                          label="Prod Name"
                          fullWidth
                          autoComplete="prodName"
                          onChange={handleChange}
                          value={values.prodName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className={classes.moduleFormControl}>
                          <InputLabel id="controlEffectiveness-label">
                            Control Effectiveness
                          </InputLabel>
                          <Select
                            labelId="controlEffectiveness-label"
                            fullWidth
                            id="controlEffectiveness"
                            value={values.controlEffectiveness}
                            onChange={(e) => {
                              handleChange("controlEffectiveness")(
                                e.target.value,
                              );
                            }}
                          >
                            {Object.keys(CONTROL_EFFECTIVENESS).map((key) => (
                              <MenuItem key={key} value={key}>
                                {CONTROL_EFFECTIVENESS[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className={classes.moduleFormControl}>
                          <InputLabel id="monitorMechanism-label">
                            Monitor Mechanism
                          </InputLabel>
                          <Select
                            labelId="monitorMechanism-label"
                            fullWidth
                            id="monitorMechanism"
                            value={values.monitorMechanism}
                            onChange={(e) => {
                              handleChange("monitorMechanism")(e.target.value);
                            }}
                          >
                            {Object.keys(MONITORING_MECHANISM).map((key) => (
                              <MenuItem key={key} value={key}>
                                {MONITORING_MECHANISM[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className={classes.moduleFormControl}>
                          <InputLabel id="controlAutomation-label">
                            Control Automation
                          </InputLabel>
                          <Select
                            labelId="controlAutomation-label"
                            fullWidth
                            id="controlAutomation"
                            value={values.controlAutomation}
                            onChange={(e) => {
                              handleChange("controlAutomation")(e.target.value);
                            }}
                          >
                            {Object.keys(CONTROL_AUTOMATION).map((key) => (
                              <MenuItem key={key} value={key}>
                                {CONTROL_AUTOMATION[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className={classes.moduleFormControl}>
                          <InputLabel id="regulatoryImpact-label">
                            Regulatory Impact
                          </InputLabel>
                          <Select
                            labelId="regulatoryImpact-label"
                            fullWidth
                            id="regulatoryImpact"
                            value={values.regulatoryImpact}
                            onChange={(e) => {
                              handleChange("regulatoryImpact")(e.target.value);
                            }}
                          >
                            {Object.keys(REGULATORY_IMPACT).map((key) => (
                              <MenuItem key={key} value={key}>
                                {REGULATORY_IMPACT[key]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="policyDetails"
                          name="policyDetails"
                          label="Policy details"
                          fullWidth
                          autoComplete="policyDetails"
                          onChange={handleChange}
                          value={values.policyDetails}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="relavantPolicy"
                          name="relavantPolicy"
                          label="Relavant Policy"
                          fullWidth
                          autoComplete="relavantPolicy"
                          onChange={handleChange}
                          value={values.relavantPolicy}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="processNote"
                          name="processNote"
                          label="Process Note"
                          fullWidth
                          autoComplete="processNote"
                          onChange={handleChange}
                          value={values.processNote}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="sno"
                          name="sno"
                          label="S No"
                          fullWidth
                          autoComplete="sno"
                          onChange={handleChange}
                          value={values.sno}
                        />
                      </Grid>
                    </Grid>
                    <div className={classes.addActionContainer}>
                      <Button
                        className={classes.addAction}
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </Widget>
              </Grid>
            </Grid>
          );
        }}
      </Formik>
    </>
  );
};

export default withRouter(CRAGeneration);
