import style from "../../Assets/Styles/confirm.module.scss";
import buttons from "../../Assets/Styles/common/buttons.module.scss";

export default function Buttons({
  onDecline,
  onAccept,
  declineText,
  acceptText,
  declineStyle,
  acceptStyle,
}) {
  return (
    <div className={style.buttons}>
      <button
        onClick={onDecline}
        className={buttons.transparentBlue_big}
        style={declineStyle ? declineStyle : null}
      >
        {declineText}
      </button>
      <button
        onClick={onAccept}
        className={buttons.transparentRed_big}
        style={acceptStyle ? acceptStyle : null}
      >
        {acceptText}
      </button>
    </div>
  );
}
