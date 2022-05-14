import style from "../../Assets/Styles/table.module.scss";
import {
  EMPLOYEE_SEARCH_PLACEHOLDER,
  STAFF_TABLE,
  NO_EMPLOYEE,
  ADD_EMPLOYEE,
} from "../../Constants/text";
import extractColumnsFromTableObject from "../../Utils/extractColumnsFromTableObject";
import TableDashboard from "./TableDashboard";
import { useState, useEffect, useContext } from "react";
import Column from "./Column";
import MarkingColumn from "./MarkingColumn";
import NoContent from "./NoContent";
import CreateEmployeeForm from "./CreateEmployeeForm";
import { TABLET_VIEW } from "../../Constants/numbers";
import { UserContext } from "../../App";
import Filters from "./Filters";

const workers = [
  { fullname: "Dimon", email: "dimon@gmail.com", date: "1652367292842" },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
  },
  { fullname: "Dimon", email: "dimon@gmail.com", date: "1652367292842" },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
  },
  { fullname: "Dimon", email: "dimon@gmail.com", date: "1652367292842" },
  {
    fullname: "Vlados DotNet",
    email: "dotNet@gmail.com",
    date: "1552367292842",
  },
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
  onCreateObject,
  onDeleteObject,
}) {
  const [tableRows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [markedRows, setMarkedRows] = useState({});
  const [modal, setModal] = useState(false);

  const onOpenCreateModal = () => setModal(true);

  const { width } = useContext(UserContext);

  const onDelete = () => {
    const newRows = [...tableRows];
    const marked = { ...markedRows };
    Object.keys(markedRows)
      .reverse()
      .forEach((id) => {
        onDeleteObject(tableRows[id]); // Delete request
        newRows.splice(id, 1);
        delete marked[id];
      });
    setMarkedRows(marked);
    setRows(newRows);
  };

  const onCreate = (values) => {
    onCreateObject(values);
    setRows((prev) => {
      return [...prev, values];
    });
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
        isMarksPresent={Object.keys(markedRows).length}
      />
      {width <= TABLET_VIEW ? (
        <Filters
          sortValue={sortValue}
          onSearchChange={onSearchChange}
          onDelete={onDelete}
          onSortChange={onSortChange}
          searchPlaceholder={EMPLOYEE_SEARCH_PLACEHOLDER}
          searchValue={searchValue}
          isMarksPresent={Object.keys(markedRows).length}
        />
      ) : null}
      <div className={style.table}>
        <MarkingColumn
          rowCount={tableRows.length}
          onMarkChange={onMarkChange}
          onMarkAll={onChangeAllMarks}
          markedRows={markedRows}
          onOpenCreateModal={onOpenCreateModal}
        />
        <div className={style.tableWrapper}>
          {columns.map((rows, index) => (
            <Column
              key={index}
              rows={rows.rows}
              header={rows.header}
              isLast={index === columns.length - 1}
              markedRows={markedRows}
              addObjectText={ADD_EMPLOYEE}
              onOpenCreateModal={onOpenCreateModal}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={style.tableHolder}>
      {tableRows.length > 0 ? (
        table
      ) : (
        <NoContent text={NO_EMPLOYEE} onAdd={onOpenCreateModal} />
      )}
      <CreateEmployeeForm
        isVisible={modal}
        onClose={() => setModal(false)}
        onCreate={onCreate}
      />
    </div>
  );
}
