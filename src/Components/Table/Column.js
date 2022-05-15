import style from "../../Assets/Styles/table.module.scss";
import { ReactComponent as Plus } from "../../Assets/Svg/Plus.svg";

export default function Column({
  rows,
  markedRows,
  isLast,
  addObjectText,
  onOpenCreateModal,
}) {
  return (
    <div className={style.column}>
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
