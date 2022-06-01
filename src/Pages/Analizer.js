import style from "../Assets/Styles/analizer.module.scss";
import CustomForm from "../Components/Form";
import { ANALIZER_TEXT, ANALIZE_TEXT } from "../Constants/text";
import { getNorms } from "../Services/Analizer";

export default function Analizer() {
  return (
    <div className={style.page}>
      <CustomForm
        formHeader={ANALIZER_TEXT}
        onSubmit={() => getNorms()}
        submitText={ANALIZE_TEXT}
      />
    </div>
  );
}
