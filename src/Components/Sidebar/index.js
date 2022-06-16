import style from "../../Assets/Styles/sidebar.module.scss";
import Logo from "../../Components/Logo/index";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { LOGOUT } from "../../Constants/links";
import { LOGOUT as LOGOUT_TEXT } from "../../Constants/text";
import { ReactComponent as Leave } from "../../Assets/Svg/Leave.svg";
import {
  SIDEBAR_BUTTONS,
  SIDEBAR_TABLET_STYLE,
  SIDEBAR_MOBILE_STYLE,
  SIDEBAR_TABLET_MARGIN,
  SIDEBAR_CLOSED_MARGIN,
  SIDEBAR_MOBILE_MARGIN,
} from "../../Utils/objects/sidebar";
import { INITIAL_DEFAULT } from "../../Constants/links";
import { MOBILE_LAYOUT_WIDTH, TABLET_VIEW } from "../../Constants/numbers";
import Fencing from "../Fencing";
import Close from "../Buttons/Close";

export default function Sidebar() {
  const { pathname, role, width, isSidebarVisible, setSidebar } =
    useContext(UserContext);
  const [retractableSidebarStyle, setSidebarStyle] =
    useState(SIDEBAR_TABLET_STYLE);

  const buttons = SIDEBAR_BUTTONS[role];

  useEffect(() => {
    width > TABLET_VIEW && setSidebar(false);
  }, [width, setSidebar]);

  useEffect(() => {
    if (isSidebarVisible) {
      if (width <= MOBILE_LAYOUT_WIDTH)
        setSidebarStyle({
          ...SIDEBAR_MOBILE_STYLE,
          marginLeft: SIDEBAR_MOBILE_MARGIN,
        });
      else if (width <= TABLET_VIEW)
        setSidebarStyle({
          ...SIDEBAR_TABLET_STYLE,
          marginLeft: SIDEBAR_TABLET_MARGIN,
        });
    } else
      setSidebarStyle((prev) => {
        return { ...prev, marginLeft: SIDEBAR_CLOSED_MARGIN };
      });
  }, [isSidebarVisible, width]);

  if (pathname === INITIAL_DEFAULT) return null;

  return (
    <>
      <aside
        className={style.sidebar}
        style={width <= TABLET_VIEW ? retractableSidebarStyle : null}
      >
        <div className={style.logoArea}>
          <Logo style={style} />
          {isSidebarVisible ? (
            <Close onClick={() => setSidebar(false)} />
          ) : null}
        </div>
        {buttons?.map((button, index) => (
          <Link
            to={button.link}
            key={index}
            style={button?.style}
            className={
              pathname === button.link
                ? style.currentLocation
                : style.standardButton
            }
            onClick={() => setSidebar(false)}
          >
            {button?.svg}
            {button.text}
          </Link>
        ))}

        <Link className={style.logout} to={LOGOUT}>
          <Leave />
          {LOGOUT_TEXT}
        </Link>
      </aside>
      {isSidebarVisible ? <Fencing /> : null}
    </>
  );
}
