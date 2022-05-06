import Menu from "./Menu";
import { useState, useEffect } from "react";

export default function DropdownWrapper({
  children,
  buttons,
  style,
  closeAfterClick,
}) {
  const [mouseCoords, setCoords] = useState(null);

  const closeMenu = (event, forceClosing = false) => {
    if (forceClosing) setCoords(null);
    else if (
      (event.button !== 2 || event.target?.parentElement?.id !== "wrapper") &&
      event.target?.parentElement?.id !== "dropdownMenu" &&
      event.target?.id !== "dropdownMenu"
    )
      setCoords(null);
  };

  const onRightClick = (event) => {
    event.preventDefault();

    if (event.buttons === 2) {
      const x = event.clientX;
      const y = event.clientY;
      setCoords({ x: x, y: y });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div
      id="wrapper"
      className={style.wrapper}
      onContextMenu={onRightClick}
      onMouseDown={closeMenu}
    >
      <Menu
        buttons={buttons}
        style={style}
        mouseCoordinates={mouseCoords}
        closeAfterClick={closeAfterClick}
        onClose={closeMenu}
      />
      {children}
    </div>
  );
}
