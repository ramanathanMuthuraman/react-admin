import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";
import useStyles from "./styles";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    var classes = useStyles();
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      <>
        <Checkbox
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          className={classes.root}
          indeterminate={indeterminate}
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  },
);

export default IndeterminateCheckbox;
