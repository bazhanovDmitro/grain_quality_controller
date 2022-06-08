import style from "../Assets/Styles/norms.module.scss";
import { SELECT_ACTION, SELECT_FORM } from "../Constants/text";
import Selector from "../Layouts/Selector";
import { useState, useEffect, useContext } from "react";
import { deleteNorm, getNorms } from "../Services/Analizer";
import { CREATE, UPDATE, DELETE } from "../Constants/text";
import { useNavigate } from "react-router-dom";
import {
  NORM_CONSTRUCTOR_CREATE,
  NORM_CONSTRUCTOR_UPDATE,
} from "../Constants/links";
import Confirm from "../Components/Confirm";
import Modal from "../Components/Modal";
import { UserContext } from "../App";

export default function Norms() {
  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const { setNorm } = useContext(UserContext);

  const navigate = useNavigate();

  const onSelect = (cultureName) => {
    const cultureIndex = cultures.findIndex(
      (culture) => culture.cultureName === cultureName
    );
    setSelected(cultureIndex);
    setNorm(cultures[cultureIndex]);
  };

  const onDeleteNorm = () => {
    deleteNorm(cultures[selectedCulture].id).then(() => {
      setCultures((prev) =>
        prev.filter((culture) => culture.id !== cultures[selectedCulture].id)
      );
      setSelected(null);
      setConfirm(false);
    });
  };

  const onUpdateClick = () => {
    navigate(NORM_CONSTRUCTOR_UPDATE);
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
          <button
            disabled={selectedCulture !== null}
            onClick={() => navigate(NORM_CONSTRUCTOR_CREATE)}
          >
            {CREATE}
          </button>
          <button onClick={onUpdateClick} disabled={selectedCulture === null}>
            {UPDATE}
          </button>
          <button
            onClick={() => setConfirm(true)}
            disabled={selectedCulture === null}
          >
            {DELETE}
          </button>
        </div>
      </div>
      {confirm && (
        <Modal onOtsideClick={() => setConfirm(false)}>
          <Confirm
            onDecline={() => setConfirm(false)}
            onAccept={onDeleteNorm}
            acceptText="Proceed"
            declineText={"Cancel"}
            header={"Norm deletion"}
            text="The norm would be deleted in Grain Guality Conrol system after form submitting. Are you sure you want to proceed?"
          />
        </Modal>
      )}
    </div>
  );
}
