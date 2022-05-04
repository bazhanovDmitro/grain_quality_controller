import style from "../../Assets/Styles/common/buttons.module.scss";
import { ReactComponent as Cross } from "../../Assets/Svg/Cross.svg";

export default function Close({ onClick }) {
  return (
    <button className={style.close} onClick={onClick}>
      <Cross />
    </button>
  );
}
