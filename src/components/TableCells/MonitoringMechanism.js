import { MONITORING_MECHANISM } from "../../constants/constants";

const DateRender = ({ value }) => {
  return <>{MONITORING_MECHANISM[value]}</>;
};

export default DateRender;
