import style from "../../Assets/Styles/modal.module.scss";
import switchTabSelection from "../../Utils/tabSelection";
import OutsideClickHandler from "react-outside-click-handler";
import { useEffect, useState } from "react";

export default function Modal({ children, onOtsideClick }) {
  const [readyToRender, setReadiness] = useState(false);

  useEffect(() => {
    switchTabSelection(false);
    setReadiness(true);
    return () => {
      switchTabSelection(true);
    };
  }, []);

  return (
    <>
      {readyToRender ? (
        <div className={style.background}>
          <OutsideClickHandler onOutsideClick={onOtsideClick}>
            {children}
          </OutsideClickHandler>
        </div>
      ) : null}
    </>
  );
}
