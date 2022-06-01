import style from "../Assets/Styles/norms.module.scss";
import { SELECT_ACTION, SELECT_FORM } from "../Constants/text";
import Selector from "../Layouts/Selector";
import { useState, useEffect } from "react";
import { getNorms } from "../Services/Analizer";
import { CREATE, UPDATE, DELETE } from "../Constants/text";

export default function Norms() {
  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelected] = useState(null);

  const onSelect = (cultureName) => {
    setSelected(
      cultures.findIndex((culture) => culture.cultureName === cultureName)
    );
  };

  useEffect(() => {
    getNorms().then((cultures) => setCultures(cultures));
  }, []);

  return (
    <div className={style.page}>
      <div className={style.selectorWrapper}>
        <Selector
          header={selectedCulture === null ? SELECT_FORM : SELECT_ACTION}
          selectArray={cultures}
          selectedIndex={selectedCulture}
          onSelect={onSelect}
        />
        <div className={style.actionButtons}>
          <button disabled={selectedCulture === null}>{CREATE}</button>
          <button disabled={selectedCulture === null}>{UPDATE}</button>
          <button disabled={selectedCulture === null}>{DELETE}</button>
        </div>
      </div>
    </div>
  );
}
