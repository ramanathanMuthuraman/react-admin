import React, { useEffect, useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { NOOP } from "../../constants/constants";
import service from "../../utils/serviceUtils";
import { urlList } from "../../config/urlConfig";

import useStyles from "./styles";

const CustomerIdFilter = ({ onChange, ...rest }) => {
  var classes = useStyles();
  const handleChange = onChange || NOOP;
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  const onOptionSelect = (event) => {
    setSelectedValue(event.target.value);
    handleChange(event.target.value);
  };

  const getOptions = () => {
    service({
      method: "get",
      url: urlList.cusomerId,
    })
      .then((res) => {
        setOptions(res);
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
      <InputLabel htmlFor="filter-by">Filter By Cusomer ID</InputLabel>
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
        <MenuItem value="">None</MenuItem>
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
