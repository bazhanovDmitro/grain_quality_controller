import style from "../../Assets/Styles/table.module.scss";
import {
  EMPLOYEE_SEARCH_PLACEHOLDER,
  STAFF_TABLE,
  NO_EMPLOYEE,
} from "../../Constants/text";
import extractColumnsFromTableObject from "../../Utils/extractColumnsFromTableObject";
import TableDashboard from "./TableDashboard";
import { useState, useEffect } from "react";
import Column from "./Column";
import MarkingColumn from "./MarkingColumn";
import NoContent from "./NoContent";

const workers = [
  { fullname: "Dimon", email: "dimon@gmail.com", date: "1652367292842" },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
  },
  {
    fullname: "Semenov Olec Mykola",
    email: "auction.io@gmail.com",
    date: "1452367292842",
  },
  {
    fullname: "Semenov Olec Mykola",
    email: "auction.io@gmail.com",
    date: "1452367292842",
  },
  {
    fullname: "Semenov Olec Mykola",
    email: "auction.io@gmail.com",
    date: "1452367292842",
  },
];

export default function Table({
  onSearchChange,
  searchValue,
  sortValue,
  onSortChange,
}) {
  const [tableRows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [markedRows, setMarkedRows] = useState({});

  const onDelete = () => {
    const newRows = [...tableRows];
    const marked = { ...markedRows };
    Object.keys(markedRows)
      .reverse()
      .forEach((id) => {
        console.log(tableRows[id]); // Delete request
        newRows.splice(id, 1);
        delete marked[id];
      });
    setMarkedRows(marked);
    setRows(newRows);
  };

  const onMarkChange = (event) => {
    const id = event.target.id;
    setMarkedRows((prev) => {
      if (!prev[id]) return { ...prev, [id]: true };
      const markedRows = { ...prev };
      delete markedRows[id];
      return markedRows;
    });
  };

  const onChangeAllMarks = (idArray) => {
    setMarkedRows((prev) => {
      if (Object.keys(prev).length > 0) return {};
      const marked = {};
      idArray.forEach((id) => (marked[id] = true));
      return marked;
    });
  };

  useEffect(() => {
    setRows(workers);
  }, []);

  useEffect(() => {
    setColumns(extractColumnsFromTableObject(tableRows));
  }, [tableRows]);

  const table = (
    <>
      <TableDashboard
        header={STAFF_TABLE}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        sortValue={sortValue}
        searchPlaceholder={EMPLOYEE_SEARCH_PLACEHOLDER}
        onSortChange={onSortChange}
        onDelete={onDelete}
      />
      <div className={style.table}>
        <MarkingColumn
          rowCount={tableRows.length}
          onMarkChange={onMarkChange}
          onMarkAll={onChangeAllMarks}
          markedRows={markedRows}
        />
        {columns.map((rows, index) => (
          <Column
            key={index}
            rows={rows.rows}
            header={rows.header}
            isLast={index === columns.length - 1}
            markedRows={markedRows}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className={style.tableHolder}>
      {tableRows.length > 0 ? table : <NoContent text={NO_EMPLOYEE} />}
    </div>
  );
}
