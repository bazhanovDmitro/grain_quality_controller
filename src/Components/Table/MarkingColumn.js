import style from "../../Assets/Styles/table.module.scss";

export default function MarkingColumn({ rowCount }) {
  const generateEmptyArray = () => {
    const emptyArray = [];
    for (let i = 0; i < rowCount; i++) emptyArray.push(i);
    return emptyArray;
  };

  return (
    <div className={style.markingColumn}>
      <div className={style.header}>
        <button className={style.checkbox}></button>
      </div>
      {generateEmptyArray().map((id) => (
        <div className={style.checkRow} key={id} id={id}>
          <button className={style.checkbox}></button>
        </div>
      ))}
    </div>
  );
}
