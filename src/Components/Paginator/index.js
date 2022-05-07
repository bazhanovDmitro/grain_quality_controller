import { ReactComponent as Arrow } from "../../Assets/Svg/Arrow.svg";

export default function Paginator({
  style,
  page,
  elementsNumberOnPage,
  totalRecordNumber,
  onPageDecrease,
  onPageIncrease,
  children,
}) {
  return (
    <div className={style?.paginator}>
      <button
        onClick={onPageDecrease}
        className={style?.button}
        disabled={page / elementsNumberOnPage === 1}
      >
        <Arrow style={{ transform: `rotate(180deg) translate(50%, 50%)` }} />
      </button>
      {children ? children : page / elementsNumberOnPage}
      <button
        onClick={onPageIncrease}
        className={style?.button}
        disabled={
          Math.ceil(totalRecordNumber / elementsNumberOnPage) ===
          page / elementsNumberOnPage
        }
      >
        <Arrow style={{ transform: `translate(-50%, -50%)` }} />
      </button>
    </div>
  );
}
