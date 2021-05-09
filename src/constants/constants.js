const NOOP = () => {};

const PAGE_SIZE = 10;

const REGULATORY_IMPACT = {
  1: "Low Regulatory",
  2: "Medium Regulatory",
  3: "High Regulatory",
};

const MONITORING_MECHANISM = {
  1: "Maker/Checker",
  2: "No Maker/Checker",
  3: "No Control/control failure",
};

const CONTROL_AUTOMATION = {
  1: "Automated",
  2: "Semi Automated",
  3: "Manual Process",
};

const CONTROL_EFFECTIVENESS = {
  1: "Satisfactory",
  2: "Improvement Needed",
  3: "Weak",
};

export {
  NOOP,
  PAGE_SIZE,
  REGULATORY_IMPACT,
  MONITORING_MECHANISM,
  CONTROL_AUTOMATION,
  CONTROL_EFFECTIVENESS,
};
