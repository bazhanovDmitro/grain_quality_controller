import Logo from "../Logo/index";
import style from "../../Assets/Styles/spinner.module.scss";

export default function Spinner() {
  return (
    <div className={style.background}>
      <div className={style.logoHolder}>
        <Logo style={style} />
        <div className={style.curtainLeft}></div>
        <div className={style.curtainRight}></div>
      </div>
    </div>
  );
}
