import style from "../../Assets/Styles/table.module.scss";
import { ReactComponent as Check } from "../../Assets/Svg/Check.svg";

export default function MarkingColumn({
  rowCount,
  onMarkChange,
  onMarkAll,
  markedRows,
}) {
  const generateEmptyArray = () => {
    const emptyArray = [];
    for (let i = 0; i < rowCount; i++) emptyArray.push(i);
    return emptyArray;
  };

  const array = generateEmptyArray();

  return rowCount > 0 ? (
    <div className={style.markingColumn}>
      <div className={style.header}>
        <button
          className={`${style.checkbox} ${
            Object.keys(markedRows).length === array.length
              ? style.checkboxActive
              : null
          }`}
          onClick={() => onMarkAll(array)}
        >
          <Check />
        </button>
      </div>
      {array.map((id) => (
        <div className={style.checkRow} key={id}>
          <button
            className={`${style.checkbox} ${
              markedRows[id] ? style.checkboxActive : null
            }`}
            id={id}
            onClick={onMarkChange}
          >
            <Check />
          </button>
        </div>
      ))}
    </div>
  ) : null;
}
