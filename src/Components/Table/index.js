import style from "../../Assets/Styles/table.module.scss";
import { EMPLOYEE_SEARCH_PLACEHOLDER, STAFF_TABLE } from "../../Constants/text";
import extractColumnsFromTableObject from "../../Utils/extractColumnsFromTableObject";
import TableDashboard from "./TableDashboard";
import { useState, useEffect } from "react";
import Column from "./Column";
import MarkingColumn from "./MarkingColumn";

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
];

export default function Table({
  onSearchChange,
  searchValue,
  sortValue,
  onSortChange,
}) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(extractColumnsFromTableObject(workers));
  }, []);

  return (
    <div className={style.tableHolder}>
      <TableDashboard
        header={STAFF_TABLE}
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        sortValue={sortValue}
        searchPlaceholder={EMPLOYEE_SEARCH_PLACEHOLDER}
        onSortChange={onSortChange}
      />
      <div className={style.table}>
        <MarkingColumn rowCount={columns.length} />
        {columns.map((rows, index) => (
          <Column
            key={index}
            rows={rows.rows}
            header={rows.header}
            isLast={index === columns.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
