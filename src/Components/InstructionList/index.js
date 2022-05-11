import style from "../../Assets/Styles/instructionList.module.scss";
import Item from "./Item";

export default function InstructionList({ items }) {
  return (
    <ul className={style.list}>
      {items.map((item, key) => (
        <Item
          key={key}
          text={item.text}
          link={item.link}
          linkText={item.linkText}
          confirmation={item.confirmation}
        />
      ))}
    </ul>
  );
}
