import { CONTROL_AUTOMATION } from "../../constants/constants";

const DateRender = ({ value }) => {
  return <>{CONTROL_AUTOMATION[value]}</>;
};

export default DateRender;
