import React, { useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
// import { makeStyles } from "@material-ui/core/styles";
import { Table, TableRow, TableHead, TableBody } from "@material-ui/core";
import { StyledTableRow, StyledTableCell } from "./styles";
import { NOOP } from "../../constants/constants";

export default function TableComponent({
  columns,
  data,
  hooksCallback,
  noDataText,
  onRowSelectionChange,
  hiddenColumns,
}) {
  const hooksProp = hooksCallback || NOOP;
  const rowSelectionChange = onRowSelectionChange || NOOP;
  const noDataMessage = noDataText || "No records found";
  const columnToHide = hiddenColumns || [];
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    selectedFlatRows,
    // state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columnToHide,
      },
    },
    useRowSelect,
    hooksProp,
  );

  useEffect(() => {
    rowSelectionChange(selectedFlatRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows]);

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
