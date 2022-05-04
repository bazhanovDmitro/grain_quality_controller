import Close from "../Buttons/Close";

export default function Body({
  closeButton,
  onClose,
  text,
  highlighted,
  style,
}) {
  return (
    <div className={style.bodyContainer}>
      {closeButton ? <Close onClick={() => onClose()} /> : null}
      <p className={style.textArea}>
        {text} <span className={style.highlighted}>{highlighted}</span>
      </p>
    </div>
  );
}
