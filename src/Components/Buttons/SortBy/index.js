import Menu from "./Menu";
import style from "../../../Assets/Styles/sortBy.module.scss";
import { useState } from "react";

export default function SortBy({ sortTags, currentTag, onChange }) {
  const [isActive, setActive] = useState(false);

  return (
    <div className={style.sortByContainer}>
      <button
        className={style.sortBy}
        onClick={() => setActive((prev) => !prev)}
      >
        {sortTags.find((tag) => tag.id === currentTag).svg}
      </button>
      {isActive && (
        <Menu
          elements={sortTags}
          onChange={onChange}
          onClose={() => setActive(false)}
        />
      )}
    </div>
  );
}
