import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Table, TableRow, TableHead, TableBody } from "@material-ui/core";
import { StyledTableRow, StyledTableCell } from "./styles";

export default function TableComponent({
  data,
  noDataText,
  headerGroups,
  prepareRow,
  getTableProps,
  getTableBodyProps,
  rows,
}) {
  const noDataMessage = noDataText || "No records found";

  if (!data || data.length === 0) {
    return <>{noDataMessage}</>;
  }

  return (
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
        {rows.map((row, i) => {
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
  );
}
