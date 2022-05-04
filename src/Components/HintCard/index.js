import style from "../../Assets/Styles/hint.module.scss";
import { useEffect } from "react";
import TimingBar from "../TimingBar.js";
import Body from "./Body";

export default function HintCard({
  header,
  text,
  highlighted,
  closeButton,
  onClose,
  children,
  timing = null,
}) {
  useEffect(() => {
    if (timing) {
      setTimeout(() => onClose(), timing);
    }
  }, [timing, onClose]);

  return (
    <div className={style.container}>
      <div
        className={style.headerContainer}
        style={{ display: children ? "inline-flex" : "flex" }}
      >
        {header}
      </div>
      <Body
        closeButton={closeButton}
        text={text}
        highlighted={highlighted}
        style={style}
        onClose={onClose}
      />
      {children}
      {timing !== null ? <TimingBar timing={timing} /> : null}
    </div>
  );
}
