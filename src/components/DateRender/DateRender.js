import { format } from "date-fns";

const DateRender = ({ value }) => {
  return <>{format(new Date(value), "MM/dd/yyyy")}</>;
};

export default DateRender;
