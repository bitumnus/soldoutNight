import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";

export default function Table({ columns, data, hiddenColumns }) {
  const [filterInput, setFilterInput] = useState("");
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: [hiddenColumns]
      }
    },
    useFilters,
    useSortBy
  );

  const handleFilterChangeName = e => {
    const value = e.target.value || undefined;
    setFilter("login", value);
    setFilterInput(value);
  };

  const handleFilterChangeID = e => {
    const value = e.target.value || undefined;
    setFilter("id", value);
    setFilterInput(value);
  };

  const handleFilterChangeRepos = e => {
    const value = e.target.value || undefined;
    setFilter("reposName", value);
    setFilterInput(value);
  };
  
  return (
    <>
      <input
        value={filterInput}
        onChange={handleFilterChangeName}
        placeholder={"Search name"}
      />
      <input
        value={filterInput}
        onChange={handleFilterChangeID}
        placeholder={"Search id"}
      />
      <input
        value={filterInput}
        onChange={handleFilterChangeRepos}
        placeholder={"Search id"}
        style={{display: {hiddenColumns} ? 'block' : 'none' }}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}