import style from "../../Assets/Styles/dropdown.module.scss";
import DropdownWrapper from "./Wrapper";

export default function DropdownMenu({
  children,
  buttons,
  closeAfterClick = true,
}) {
  return (
    <DropdownWrapper
      style={style}
      buttons={buttons}
      closeAfterClick={closeAfterClick}
    >
      {children}
    </DropdownWrapper>
  );
}
