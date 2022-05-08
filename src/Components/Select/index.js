import style from "../../Assets/Styles/select.module.scss";
import { ReactComponent as SmallArrow } from "../../Assets/Svg/SmallArrow.svg";

export default function Select({ itemList, onItemChange, currentItem }) {
  return (
    <div className={style.select}>
      <div className={style.inputArea}>{currentItem}</div>
      <SmallArrow />
    </div>
  );
}
