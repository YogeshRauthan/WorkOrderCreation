import React from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

let table = createTable().setRowType();

function Table() {
  const columns = React.useMemo(
    () => [
      table.createDataColumn("name", {
        header: ({ instance }) => (
          <>
            <input
              type="checkbox"
              onChange={instance.getToggleAllRowsSelectedHandler()}
            />{" "}
            Package
          </>
        ),
        cell: ({ row, getValue }) => (
          <div>
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />{" "}
            {getValue()}
          </div>
        ),
        footer: (props) => props.column.id,
        width: 200, 
      }),
      table.createDataColumn("rate", {
        header: "Rate",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        width: 100, 
      }),
      table.createDataColumn("total", {
        header: "Total",
        footer: (props) => props.column.id,
        cell: ({ row, getValue }) => (
          <div style={{ position: "relative" }}>
            {getValue()}
            {/* Check if row can expand */}
            {row.getCanExpand() && (
              <button
                onClick={row.getToggleExpandedHandler()}
                style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
              >
                {row.getIsExpanded() ? " ➖" : "➕"}
              </button>
            )}
          </div>
        ),
        width: 150, 
      }),
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(5, 4, 3));
  const refreshData = () => setData(() => makeData(5, 4, 3));

  const [expanded, setExpanded] = React.useState({});

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th key={header.id} colSpan={header.colSpan} style={{ width: columns[index].width }}>
                  {header.isPlaceholder ? null : (
                    <div>{header.renderHeader()}</div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => {
            const isSubRow = row.depth > 0;
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    key={cell.id}
                    style={{
                      paddingLeft: isSubRow && i === 0 ? (row.depth + 1) * 10 : 10,
                    }}
                  >
                    {cell.renderCell()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
    </div>
  );
}

export default Table; 
