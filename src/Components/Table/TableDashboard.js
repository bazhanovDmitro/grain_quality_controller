import style from "../../Assets/Styles/table.module.scss";
import { useContext } from "react";
import { UserContext } from "../../App";
import { TABLET_VIEW } from "../../Constants/numbers";
import Filters from "./Filters";

export default function TableDashboard({
  sortValue,
  onSearchChange,
  onSearch,
  onSortChange,
  searchPlaceholder,
  searchValue,
  header,
  onDelete,
  isMarksPresent,
}) {
  const { width } = useContext(UserContext);

  const rightHalf = (
    <Filters
      sortValue={sortValue}
      onSearch={onSearch}
      onSearchChange={onSearchChange}
      onDelete={onDelete}
      onSortChange={onSortChange}
      searchPlaceholder={searchPlaceholder}
      searchValue={searchValue}
      isMarksPresent={isMarksPresent}
    />
  );

  return (
    <div className={style.tableDashboard}>
      <div
        className={style.halfLeft}
        style={width <= TABLET_VIEW ? { width: `100%` } : null}
      >
        <h2
          style={
            width <= TABLET_VIEW ? { width: `100%`, textAlign: `center` } : null
          }
        >
          {header}
        </h2>
      </div>
      {width > TABLET_VIEW ? rightHalf : null}
    </div>
  );
}
