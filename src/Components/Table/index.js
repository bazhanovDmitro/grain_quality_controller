import style from "../../Assets/Styles/table.module.scss";
import { EMPLOYEE_SEARCH_PLACEHOLDER, STAFF_TABLE } from "../../Constants/text";
import TableDashboard from "./TableDashboard";

export default function Table({
  onSearchChange,
  searchValue,
  sortValue,
  onSortChange,
}) {
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
      <div className={style.table}></div>
    </div>
  );
}
