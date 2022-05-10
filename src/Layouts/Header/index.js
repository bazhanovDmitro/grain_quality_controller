import { ReactComponent as Wheat } from "../../Assets/Svg/Wheat.svg";
import { ReactComponent as Sidebar } from "../../Assets/Svg/Sidebar.svg";
import { SYSTEM_FULL_NAME, SYSTEM_SHORT_NAME } from "../../Constants/text";
import { useContext } from "react";
import { UserContext } from "../../App";
import style from "../../Assets/Styles/header.module.scss";
import { INITIAL } from "../../Constants/links";
import { TABLET_VIEW, MOBILE_VIEW } from "../../Constants/numbers";

export default function Header() {
  const { role, width, pathname, setSidebar } = useContext(UserContext);

  const sidebar =
    pathname !== "/" + INITIAL && width < TABLET_VIEW ? (
      <Sidebar className={style.sidebar} onClick={() => setSidebar(true)} />
    ) : null;

  return (
    <div className={style.container}>
      {sidebar}
      {!role ? <Wheat className={style.wheat_left} /> : null}
      <h1 className={style.name}>
        {width > MOBILE_VIEW ? SYSTEM_FULL_NAME : SYSTEM_SHORT_NAME}
      </h1>
      {!role ? <Wheat className={style.wheat_right} /> : null}
    </div>
  );
}
