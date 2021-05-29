import React from "react";
import { Formik } from "formik";

import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from "@material-ui/core";

import useStyles from "./styles";

import Widget from "../../components/Widget/Widget";
import DateInput from "../../components/DateRender/DateInput";
import { useUserState } from "../../context/UserContext";
import Roles from "../../config/roles";

import {
  CONTROL_EFFECTIVENESS,
  MONITORING_MECHANISM,
  REGULATORY_IMPACT,
  CONTROL_AUTOMATION,
} from "../../constants/constants";

const CRAForm = ({ initialValues, onSubmitForm, isEditable }) => {
  var classes = useStyles();
  const userProps = useUserState();

  const { user = {} } = userProps;
  const role = user.roleName;
  const isDisabled = role !== Roles.SUPER_ADMIN && isEditable;
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmitForm}>
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                        <InputLabel id="controlDesc-label">
                          Control Description
                        </InputLabel>
                        <TextareaAutosize
                          className={classes.textArea}
                          rowsMin={5}
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
                        <FormControl className={classes.moduleFormControl}>
                          <InputLabel id="controlEffectiveness-label">
                            Control Effectiveness
                          </InputLabel>
                          <Select
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
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
                          disabled={isDisabled}
                          id="sno"
                          name="sno"
                          label="S No"
                          fullWidth
                          autoComplete="sno"
                          onChange={handleChange}
                          value={values.sno}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled={isDisabled}
                          id="status"
                          name="status"
                          label="Approval Status"
                          fullWidth
                          autoComplete="status"
                          onChange={handleChange}
                          value={values.status}
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

export default CRAForm;
