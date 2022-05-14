import style from "../../Assets/Styles/table.module.scss";

export default function Column({ rows, header, selectedFields, isLast }) {
  return (
    <div className={style.column}>
      <div className={`${style.header} ${isLast ? style.lastHeader : null}`}>
        {header}
      </div>
      {rows.map((row, index) => (
        <div
          className={`${style.row} ${isLast ? style.lastRow : null}`}
          key={index}
          id={index}
        >
          {row}
        </div>
      ))}
    </div>
  );
}
