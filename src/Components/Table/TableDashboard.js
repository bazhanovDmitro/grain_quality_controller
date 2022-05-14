import style from "../../Assets/Styles/table.module.scss";
import { ASC, DESC } from "../../Constants/text";
import { ReactComponent as Trash } from "../../Assets/Svg/Trash.svg";
import buttonStyle from "../../Assets/Styles/common/buttons.module.scss";
import SwitchButton from "../Buttons/SwitcherButton";
import Search from "../Search";

export default function TableDashboard({
  sortValue,
  onSearchChange,
  onSortChange,
  searchPlaceholder,
  searchValue,
  header,
  onDelete,
}) {
  return (
    <div className={style.tableDashboard}>
      <div className={style.halfLeft}>
        <h2>{header}</h2>
      </div>
      <div className={style.halfRight}>
        <button className={buttonStyle.delete} onClick={onDelete}>
          <Trash />
        </button>
        <SwitchButton
          initialText={ASC}
          secondaryText={DESC}
          value={sortValue}
          onSwitch={onSortChange}
          style={{
            width: `fit-content`,
            padding: `0px 15px`,
            boxSizing: `border-box`,
          }}
        />
        <Search
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
          value={searchValue}
        />
      </div>
    </div>
  );
}
