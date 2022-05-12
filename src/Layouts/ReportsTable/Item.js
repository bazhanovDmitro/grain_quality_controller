import style from "../../Assets/Styles/reports.module.scss";
import { REPORT_FROM } from "../../Constants/text";
import { useNavigate } from "react-router-dom";
import { REPORTS } from "../../Constants/links";
import { ReactComponent as Positive } from "../../Assets/Svg/Positive.svg";
import { ReactComponent as Negative } from "../../Assets/Svg/Negative.svg";

export default function Item({ date, mark, id, visible }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${REPORTS}/${id}`);
  };

  const getMarkImage = () => {
    if (mark) return <Positive className={style.mark} />;
    return <Negative className={style.mark} />;
  };

  const now = new Date(+date);
  const formatedDate = `${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getFullYear()}`;

  return (
    <div
      id={id}
      className={style.item}
      onClick={onClick}
      style={{ display: visible ? `flex` : `none` }}
    >
      {REPORT_FROM}
      {formatedDate}
      {getMarkImage()}
    </div>
  );
}
