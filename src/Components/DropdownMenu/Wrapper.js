import Menu from "./Menu";
import { useState, useEffect } from "react";

export default function DropdownWrapper({ children, buttons, style }) {
  const [mouseCoords, setCoords] = useState(null);

  const closeMenu = (event) => {
    if (event.button !== 2 || event.target?.parrentElement?.id !== "wrapper")
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
      <Menu buttons={buttons} style={style} mouseCoordinates={mouseCoords} />
      {children}
    </div>
  );
}
