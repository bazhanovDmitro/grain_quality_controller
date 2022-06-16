import style from "../Assets/Styles/restoration.module.scss";
import { CONTACT_ADMIN_TEXT } from "../Constants/text";

export default function RestorePage() {
  return (
    <div className={style.page}>
      <h1>{CONTACT_ADMIN_TEXT}</h1>
    </div>
  );
}
