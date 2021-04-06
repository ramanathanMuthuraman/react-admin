import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: "30px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  optionDetails: {
    width: "50%",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  action: {
    marginTop: "20px",
    width: "50%",
  },
}));
