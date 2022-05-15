import style from "../../Assets/Styles/search.module.scss";
import { ReactComponent as Magnifier } from "../../Assets/Svg/Magnifier.svg";
import { useState } from "react";

export default function Search({ placeholder, onChange, value, onSearch }) {
  const [isActive, setActive] = useState(false);

  const onEnterClick = (event) => {
    if (event.key === "Enter") {
      onSearch(event.target.value);
    }
  };

  const determineActive = (onFocusHandler = false) => {
    if (value || onFocusHandler) {
      setActive(true);
      return;
    }
    setActive(false);
  };

  return (
    <div className={style.searchWrapper}>
      <Magnifier
        className={style.magnifier}
        style={isActive ? { display: `none` } : null}
      />
      <input
        className={style.search}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={isActive ? { paddingLeft: `5px` } : null}
        onFocus={() => determineActive(true)}
        onBlur={() => determineActive()}
        onKeyDown={onEnterClick}
      />
    </div>
  );
}
