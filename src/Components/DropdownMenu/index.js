import style from "../../Assets/Styles/dropdown.module.scss";
import DropdownWrapper from "./Wrapper";

export default function DropdownMenu({ children, buttons }) {
  return (
    <DropdownWrapper style={style} buttons={buttons}>
      {children}
    </DropdownWrapper>
  );
}
