import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Table, TableRow, TableHead, TableBody, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { NOOP } from "../../constants/constants";
import useStyles, { StyledTableRow, StyledTableCell } from "./styles";

export default function TableComponent({
  noDataText,
  headerGroups,
  prepareRow,
  getTableProps,
  getTableBodyProps,
  rows,
  page,
  state,
  pageCount,
  gotoPage,
  onPageChangeCallback = NOOP,
}) {
  var classes = useStyles();
  const noDataMessage = noDataText || "No records found";
  const tableData = page || rows;

  useEffect(() => {
    onPageChangeCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageIndex]);

  if (!tableData || tableData.length === 0) {
    return <>{noDataMessage}</>;
  }
  const onPageChange = (event, value) => {
    gotoPage(value - 1);
  };

  return (
    <>
      {pageCount > 0 && (
        <Grid
          container
          className={classes.paginationContainer}
          justify="center"
        >
          <Pagination
            count={pageCount}
            page={state.pageIndex + 1}
            onChange={onPageChange}
          />
        </Grid>
      )}
      <div className={classes.container}>
        <Table className="mb-0" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <StyledTableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {tableData.map((row, i) => {
              prepareRow(row);
              return (
                <StyledTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <StyledTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
