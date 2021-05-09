import { REGULATORY_IMPACT } from "../../constants/constants";

const DateRender = ({ value }) => {
  return <>{REGULATORY_IMPACT[value]}</>;
};

export default DateRender;
