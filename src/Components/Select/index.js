import style from "../../Assets/Styles/select.module.scss";
import { ReactComponent as SmallArrow } from "../../Assets/Svg/SmallArrow.svg";
import Submenu from "./Submenu";
import { useState } from "react";

export default function Select({
  itemList,
  onItemChange,
  currentItemIndex,
  disabled = false,
}) {
  const [isOpen, setOpen] = useState(false);

  const switchSelect = () => {
    setOpen((prev) => !prev);
  };

  const onClose = () => setOpen(false);

  return (
    <div
      className={`${style.select} ${isOpen ? style.activeSelect : null}`}
      onClick={switchSelect}
      style={disabled ? { pointerEvents: "none", opacity: 0.4 } : null}
    >
      <div className={style.inputArea}>
        {itemList?.[currentItemIndex]?.cultureName}
      </div>
      <SmallArrow />
      {isOpen && (
        <Submenu
          list={itemList}
          onItemChange={onItemChange}
          onClose={onClose}
        />
      )}
    </div>
  );
}
