import React from "react";
import { useTable, useRowSelect } from "react-table";
// import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { NOOP } from "../../constants/constants";

export default function TableComponent({
  columns,
  data,
  hooksCallback,
  noDataText,
}) {
  const hooksProp = hooksCallback || NOOP;
  const noDataMessage = noDataText || "No records found";
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    // selectedFlatRows,
    // state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooksProp,
  );

  if (!data || data.length === 0) {
    return <>{noDataMessage}</>;
  }

  return (
    <Table className="mb-0" {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
