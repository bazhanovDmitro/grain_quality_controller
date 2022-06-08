import style from "../../Assets/Styles/norms.module.scss";
import Select from "../../Components/Select";

export default function Selector({
  header,
  selectArray,
  selectedIndex,
  onSelect,
}) {
  return (
    <div className={style.selector}>
      <h2>{header}</h2>
      <Select
        itemList={selectArray}
        currentItemIndex={selectedIndex}
        onItemChange={onSelect}
      />
    </div>
  );
}
