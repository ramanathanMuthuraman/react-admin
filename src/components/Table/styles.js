import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default makeStyles((theme) => ({
  container: {},
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f0fff0",
    fontWeight: "bold",
    border: `1px solid #ccc`,
  },
  body: {
    fontSize: 14,
    border: `1px solid #ccc`,
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
