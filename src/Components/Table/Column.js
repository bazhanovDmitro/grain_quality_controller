import style from "../../Assets/Styles/table.module.scss";
import { ReactComponent as Plus } from "../../Assets/Svg/Plus.svg";
import { EMPLOYEE_TABLE } from "../../Utils/objects/tableHeaders";

export default function Column({
  rows,
  header,
  markedRows,
  isLast,
  addObjectText,
  onOpenCreateModal,
}) {
  return (
    <div className={style.column}>
      <div className={`${style.header} ${isLast ? style.lastHeader : null}`}>
        {EMPLOYEE_TABLE[header]}
      </div>
      {rows.map((row, index) => (
        <div
          className={`${style.row} ${isLast ? style.lastRow : null} ${
            markedRows[index] ? style.markedRow : null
          }`}
          key={index}
          id={index}
        >
          {row}
        </div>
      ))}
      <div className={style.row}>
        <h3 className={style.addObject} onClick={onOpenCreateModal}>
          <Plus />
          {addObjectText}
        </h3>
      </div>
    </div>
  );
}
