import style from "../../Assets/Styles/sidebar.module.scss";
import Logo from "../../Components/Logo/index";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { LOGOUT } from "../../Constants/text";
import { ReactComponent as Leave } from "../../Assets/Svg/Leave.svg";

export default function Sidebar({ buttons }) {
  const { pathname } = useContext(UserContext);

  return (
    <aside className={style.sidebar}>
      <Logo style={style} />
      {buttons.map((button, index) => (
        <Link
          to={button.link}
          key={index}
          style={button?.style}
          className={
            pathname === button.link
              ? style.currentLocation
              : style.standardButton
          }
          onClick={button.onClick}
        >
          {button?.svg}
          {button.text}
        </Link>
      ))}

      <button className={style.logout} onClick={() => alert(`logout`)}>
        <Leave />
        {LOGOUT}
      </button>
    </aside>
  );
}
