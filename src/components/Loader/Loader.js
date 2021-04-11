import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LoaderContext } from "../../context/LoaderContext";

const styles = () => ({
  progress: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    zIndex: 1202,
  },
});

const Loader = (props) => {
  const { classes } = props;
  const { isGlobalSpinnerOn } = useContext(LoaderContext);
  return isGlobalSpinnerOn ? (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  ) : null;
};

export default withStyles(styles)(Loader);
