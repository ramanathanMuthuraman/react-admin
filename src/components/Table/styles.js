import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default makeStyles((theme) => ({
  container: {},
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: "bold",
    border: `1px solid #000`,
    color: "white",
  },
  body: {
    fontSize: 14,
    border: `1px solid #000`,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export { StyledTableRow, StyledTableCell };
