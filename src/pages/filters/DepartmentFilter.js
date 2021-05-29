import React, { useEffect, useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { NOOP } from "../../constants/constants";
import service from "../../utils/serviceUtils";
import { urlList } from "../../config/urlConfig";

import useStyles from "./styles";

const listOptions = ["ALL"];

const CustomerIdFilter = ({ onChange, ...rest }) => {
  var classes = useStyles();
  const handleChange = onChange || NOOP;
  const [options, setOptions] = useState(listOptions);
  const [selectedValue, setSelectedValue] = useState(listOptions[0]);

  const onOptionSelect = (event) => {
    setSelectedValue(event.target.value);
    handleChange(event.target.value);
  };

  const getOptions = () => {
    service({
      method: "get",
      url: urlList.craDepartment,
    })
      .then((res) => {
        setOptions(listOptions.concat(res));
      })
      .catch(() => {
        console.error("failed to fetch data");
      });
  };

  useEffect(() => {
    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="filter-by">Filter By Department</InputLabel>
      <Select
        value={selectedValue}
        onChange={onOptionSelect}
        name="filter"
        className={classes.selectEmpty}
        inputProps={{
          name: "filter",
          id: "filter-by",
        }}
        {...rest}
      >
        {options.map((value) => {
          return (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomerIdFilter;
