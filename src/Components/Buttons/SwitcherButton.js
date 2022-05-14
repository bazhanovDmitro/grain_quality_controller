import buttonStyle from "../../Assets/Styles/common/buttons.module.scss";

export default function SwitchButton({
  onSwitch,
  value,
  initialText,
  secondaryText,
  style,
}) {
  return (
    <button
      className={buttonStyle.switchButton}
      onClick={onSwitch}
      style={style && style}
    >
      {value ? initialText : secondaryText}
    </button>
  );
}
