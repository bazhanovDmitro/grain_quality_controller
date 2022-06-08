import style from "../../Assets/Styles/select.module.scss";
import { ReactComponent as SmallArrow } from "../../Assets/Svg/SmallArrow.svg";
import Submenu from "./Submenu";
import { useState } from "react";

export default function Select({ itemList, onItemChange, currentItemIndex }) {
  const [isOpen, setOpen] = useState(false);

  const switchSelect = () => {
    setOpen((prev) => !prev);
  };

  const onClose = () => setOpen(false);

  return (
    <div
      className={`${style.select} ${isOpen ? style.activeSelect : null}`}
      onClick={switchSelect}
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
