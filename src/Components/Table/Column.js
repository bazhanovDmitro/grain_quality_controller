import style from "../../Assets/Styles/table.module.scss";

export default function Column({ rows, header, markedRows, isLast }) {
  return (
    <div className={style.column}>
      <div className={`${style.header} ${isLast ? style.lastHeader : null}`}>
        {header}
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
    </div>
  );
}
