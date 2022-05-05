export default function Menu({ style, buttons, mouseCoordinates }) {
  const menu = mouseCoordinates ? (
    <div
      className={style.menu}
      style={{ left: mouseCoordinates.x, top: mouseCoordinates.y }}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          className={button.className}
          style={button.style}
          onClick={button.onClick}
        >
          {button.text}
        </button>
      ))}
    </div>
  ) : null;

  return <>{menu}</>;
}
