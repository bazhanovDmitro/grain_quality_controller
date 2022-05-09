import style from "../../Assets/Styles/select.module.scss";
import { useEffect, useCallback } from "react";

export default function Submenu({ list, onItemChange, onClose }) {
  const isListAnArray = Array.isArray(list);

  const onEscapeDown = useCallback(
    (event) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onEscapeDown);

    return () => {
      document.removeEventListener("keydown", onEscapeDown);
    };
  }, [onEscapeDown]);

  return (
    <ul className={`${style.submenu}`} id="list">
      {isListAnArray
        ? list.map((item) => (
            <li key={item.name} onClick={() => onItemChange(item.name)}>
              {item.name}
            </li>
          ))
        : null}
    </ul>
  );
}
