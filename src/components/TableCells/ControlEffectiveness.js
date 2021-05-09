import { CONTROL_EFFECTIVENESS } from "../../constants/constants";

const DateRender = ({ value }) => {
  return <>{CONTROL_EFFECTIVENESS[value]}</>;
};

export default DateRender;
