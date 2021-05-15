import { format, isValid } from "date-fns";

const dateFormatter = (value) => {
  const inputValue = isValid(new Date(value))
    ? format(new Date(value), "dd MMM yy")
    : value;
  return inputValue;
};

export { dateFormatter };
