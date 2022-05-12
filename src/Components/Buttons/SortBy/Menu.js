import style from "../../../Assets/Styles/sortBy.module.scss";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";

export default function Menu({ elements, onChange, onClose }) {
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div className={style.menu}>
        {elements.map((elem, index) => (
          <div
            key={index}
            className={style.element}
            onClick={() => {
              onChange(elem.id);
              onClose();
            }}
          >
            {elem.svg}
          </div>
        ))}
      </div>
    </OutsideClickHandler>
  );
}
