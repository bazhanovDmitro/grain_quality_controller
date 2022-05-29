import style from "../../Assets/Styles/table.module.scss";
import {
  EMPLOYEE_SEARCH_PLACEHOLDER,
  STAFF_TABLE,
  NO_EMPLOYEE,
  ADD_EMPLOYEE,
  NO_SUCH_EMPLOYEE,
} from "../../Constants/text";
import extractColumnsFromTableObject from "../../Utils/extractColumnsFromTableObject";
import TableDashboard from "./TableDashboard";
import { useState, useEffect, useContext, useRef } from "react";
import Column from "./Column";
import MarkingColumn from "./MarkingColumn";
import NoContent from "./NoContent";
import CreateEmployeeForm from "./CreateEmployeeForm";
import { TABLET_VIEW } from "../../Constants/numbers";
import { UserContext } from "../../App";
import Filters from "./Filters";
import { EMPLOYEE_TABLE } from "../../Utils/objects/tableHeaders";
import filterArray from "../../Utils/filterArray";

export default function Table({
  onSearchChange,
  searchValue,
  searchField,
  sortValue,
  sortField,
  onSortChange,
  onCreateObject,
  onDeleteObject,
  getObjects,
}) {
  const [objects, setObjects] = useState([]);
  const [tableRows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [markedRows, setMarkedRows] = useState({});
  const [modal, setModal] = useState(false);

  const onOpenCreateModal = () => setModal(true);

  const { width } = useContext(UserContext);

  const headerRef = useRef(null);
  const tableRef = useRef(null);
  const marksRef = useRef(null);

  const scrollX = (event) => {
    headerRef.current.scrollLeft = event.target.scrollLeft;
    tableRef.current.scrollLeft = event.target.scrollLeft;
  };

  const scrollY = (event) => {
    tableRef.current.scrollTop = event.target.scrollTop;
    marksRef.current.scrollTop = event.target.scrollTop;
  };

  const extractEachRowID = (columns) => {
    return columns?.find((column) => column.header === `id`)?.rows;
  };

  const sortBy = (array, filter, sortDirection) => {
    return array.sort((a, b) => {
      if (a[filter] <= b[filter]) {
        if (sortDirection) return -1;
        else return 1;
      } else {
        if (sortDirection) return 1;
        else return -1;
      }
    });
  };

  const combinedScroll = (event) => {
    scrollX(event);
    scrollY(event);
  };

  const onSearch = (word) => {
    const filteredRows = sortBy(
      filterArray(objects, searchField, word),
      sortField,
      sortValue
    );
    if (filteredRows.length > 0) setRows(filteredRows);
    else setRows([]);
  };

  const onDelete = () => {
    const newObjects = [...objects];
    const marked = { ...markedRows };
    Object.keys(markedRows)
      .reverse()
      .forEach((id) => {
        onDeleteObject(tableRows[id]); // Delete request
        newObjects.splice(id, 1);
        delete marked[id];
      });
    setMarkedRows(marked);
    setObjects(newObjects);
    setRows(newObjects);
  };

  const onCreate = (values) => {
    onCreateObject(values);
    setObjects((prev) => [...prev, values]);
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
    const objectsRequest = async () => {
      const objects = await getObjects();
      setObjects(objects);
      setRows(objects);
    };

    objectsRequest();
  }, [getObjects]);

  useEffect(() => {
    setRows((prev) => {
      if (prev.length > 0) {
        return sortBy(prev, sortField, sortValue);
      }
      return prev;
    });
  }, [sortValue, sortField]);

  useEffect(() => {
    setColumns(extractColumnsFromTableObject(tableRows));
  }, [tableRows, sortValue]);

  const table = (
    <>
      <TableDashboard
        header={STAFF_TABLE}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
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
          onSearch={onSearch}
          searchField={searchField}
          onDelete={onDelete}
          onSortChange={onSortChange}
          searchPlaceholder={EMPLOYEE_SEARCH_PLACEHOLDER}
          searchValue={searchValue}
          isMarksPresent={Object.keys(markedRows).length}
        />
      ) : null}
      <div className={style.table}>
        <MarkingColumn
          refference={marksRef}
          rows={tableRows}
          onMarkChange={onMarkChange}
          onMarkAll={onChangeAllMarks}
          markedRows={markedRows}
          onOpenCreateModal={onOpenCreateModal}
          scrollY={scrollY}
        />
        <div className={style.content}>
          <div className={style.headerRow} onScroll={scrollX} ref={headerRef}>
            {tableRows.length > 0 ? (
              Object.keys(tableRows[0]).map((row, index) =>
                row !== `id` ? (
                  <div className={style.header} key={index}>
                    {EMPLOYEE_TABLE[row]}
                  </div>
                ) : null
              )
            ) : (
              <div className={style.noOneFound}>{NO_SUCH_EMPLOYEE}</div>
            )}
          </div>
          <div
            className={style.tableWrapper}
            onScroll={combinedScroll}
            ref={tableRef}
          >
            {columns.map((rows, index) =>
              // {header: id, rows: [id, id, id, ...]} пропустить объект rows.rows где header = id как objectsID
              // и использовать его в Columns для назначения правмильных id
              rows.header !== `id` ? (
                <Column
                  key={index}
                  rows={rows.rows}
                  idArray={extractEachRowID(columns)}
                  header={rows.header}
                  isLast={index === columns.length - 1}
                  markedRows={markedRows}
                  addObjectText={ADD_EMPLOYEE}
                  onOpenCreateModal={onOpenCreateModal}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={style.tableHolder}>
      {objects.length > 0 ? (
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
