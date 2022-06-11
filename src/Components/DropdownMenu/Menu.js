export default function Menu({
  style,
  buttons,
  mouseCoordinates,
  closeAfterClick,
  onClose,
}) {
  const menu = mouseCoordinates ? (
    <div
      className={style.menu}
      id="dropdownMenu"
      style={{ left: mouseCoordinates.x, top: mouseCoordinates.y }}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          className={button.className}
          style={button.style}
          onClick={(event) => {
            onClose(event, closeAfterClick);
            setTimeout(() => button.onClick(event), 1);
          }}
        >
          {button.text}
        </button>
      ))}
    </div>
  ) : null;

  return <>{menu}</>;
}
