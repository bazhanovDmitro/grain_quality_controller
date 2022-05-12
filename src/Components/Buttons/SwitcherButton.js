import buttonStyle from "../../Assets/Styles/common/buttons.module.scss";

export default function SwitchButton({
  onSwitch,
  value,
  initialText,
  secondaryText,
}) {
  return (
    <button className={buttonStyle.switchButton} onClick={onSwitch}>
      {value ? initialText : secondaryText}
    </button>
  );
}
