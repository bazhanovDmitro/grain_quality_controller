import style from "../../Assets/Styles/timing.module.scss";

export default function TimingBar({ timing }) {
  return (
    <div
      className={style.bar}
      style={{ animation: `${style.collapse} ${timing}ms 1 linear` }}
    ></div>
  );
}
