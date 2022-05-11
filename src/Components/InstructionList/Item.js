import style from "../../Assets/Styles/instructionList.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Confirm from "../Confirm";
import { useState } from "react";
import {
  ARE_YOU_SURE,
  CANCEL,
  PERFORM,
  PERFORM_LINK_TRANSITION,
} from "../../Constants/text";

export default function Item({ text, link, linkText, confirmation }) {
  const [confirm, setConfirm] = useState(null);

  const navigate = useNavigate();

  const closeConfirm = () => setConfirm(null);
  const onAccept = () => navigate(link);

  const showConfirmWindow = () => {
    setConfirm(
      <Modal onOtsideClick={closeConfirm}>
        <Confirm
          onDecline={closeConfirm}
          declineText={CANCEL}
          onAccept={onAccept}
          acceptText={PERFORM}
          header={ARE_YOU_SURE}
          text={PERFORM_LINK_TRANSITION}
        />
      </Modal>
    );
  };

  if (!confirmation) {
    return (
      <li>
        {text}
        <Link to={link}>{linkText}</Link>
      </li>
    );
  }

  return (
    <li>
      {confirm}
      {text}
      <span onClick={showConfirmWindow} className={style.highlighted}>
        {linkText}
      </span>
    </li>
  );
}
