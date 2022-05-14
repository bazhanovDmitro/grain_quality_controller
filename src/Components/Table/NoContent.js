import style from "../../Assets/Styles/table.module.scss";

export default function NoContent({ text, onAdd }) {
  return (
    <div onClick={onAdd} className={style.empty}>
      <h1>{text}</h1>
    </div>
  );
}
