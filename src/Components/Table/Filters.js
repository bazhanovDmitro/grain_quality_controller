import style from "../../Assets/Styles/table.module.scss";
import buttonStyle from "../../Assets/Styles/common/buttons.module.scss";
import { ReactComponent as Trash } from "../../Assets/Svg/Trash.svg";
import SwitchButton from "../Buttons/SwitcherButton";
import { ASC, DESC } from "../../Constants/text";
import Search from "../Search";
import { useContext } from "react";
import { UserContext } from "../../App";
import { TABLET_VIEW } from "../../Constants/numbers";

export default function Filters({
  onDelete,
  sortValue,
  onSearchChange,
  onSortChange,
  onSearch,
  searchPlaceholder,
  searchValue,
  isMarksPresent,
}) {
  const { width } = useContext(UserContext);

  return (
    <div
      className={style.halfRight}
      style={
        width <= TABLET_VIEW
          ? {
              display: `flex`,
              width: `100%`,
              flexDirection: `row`,
              marginTop: `10px`,
            }
          : null
      }
    >
      <button
        className={buttonStyle.delete}
        onClick={onDelete}
        disabled={!isMarksPresent}
      >
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
        onSearch={onSearch}
        onChange={onSearchChange}
        value={searchValue}
      />
    </div>
  );
}
