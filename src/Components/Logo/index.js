import { ReactComponent as Wheat } from "../../Assets/Svg/Wheat.svg";
import { LOGO_TEXT } from "../../Constants/text";
import { Link } from "react-router-dom";

export default function Logo({ style, linkTo }) {
  const component = (
    <div className={style?.container}>
      <Wheat />
      <h2 className={style?.text}>{LOGO_TEXT}</h2>
      <Wheat />
    </div>
  );

  return linkTo ? <Link to={linkTo}>{component}</Link> : component;
}
