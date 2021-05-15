import { format, isValid } from "date-fns";
import { TextField } from "@material-ui/core";

const DateInput = (props) => {
  const { value, ...rest } = props;
  const inputValue = isValid(new Date(value))
    ? format(new Date(value), "yyyy-MM-dd")
    : value;
  return (
    <>
      <TextField
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        autoComplete="given-name"
        value={inputValue}
        {...rest}
      />
    </>
  );
};

export default DateInput;
