import style from "../../Assets/Styles/table.module.scss";
import { ReactComponent as Check } from "../../Assets/Svg/Check.svg";
import { ReactComponent as Plus } from "../../Assets/Svg/Plus.svg";

export default function MarkingColumn({
  rows,
  onMarkChange,
  onMarkAll,
  markedRows,
  onOpenCreateModal,
  refference,
  scrollY,
}) {
  const generateEmptyArray = () => {
    const emptyArray = [];
    for (let i = 0; i < rows.length; i++) emptyArray.push(i);
    return emptyArray;
  };

  const array = generateEmptyArray();

  return rows.length > 0 ? (
    <div>
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
      <div className={style.markingColumn} ref={refference} onScroll={scrollY}>
        {rows.map((row, index) => (
          <div className={style.checkRow} key={row.id}>
            <button
              className={`${style.checkbox} ${
                markedRows[index] ? style.checkboxActive : null
              }`}
              id={index}
              onClick={onMarkChange}
            >
              <Check />
            </button>
          </div>
        ))}
        <div className={style.checkRow}>
          <button className={style.plus} onClick={onOpenCreateModal}>
            <Plus />
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
