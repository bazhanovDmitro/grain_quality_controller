import style from "../Assets/Styles/analizer.module.scss";
import Form from "../Components/Form";
import { ANALIZER_TEXT, ANALIZE_TEXT } from "../Constants/text";
import { getNorms } from "../Services/Analizer";
import { useState, useEffect } from "react";

export default function Analizer() {
  const [formsList, setList] = useState([]);
  const [currentFormIndex, setCurrent] = useState(0);

  const getFormIndexFromCultureName = (cultureName) => {
    const cultureIndex = formsList.findIndex(
      (form) => form.cultureName === cultureName
    );
    setCurrent(cultureIndex);
  };

  useEffect(() => {
    getNorms().then((resp) => {
      setList(resp);
    });
  }, []);

  return (
    <div className={style.page}>
      <Form
        formHeader={ANALIZER_TEXT}
        submitText={ANALIZE_TEXT}
        formList={formsList}
        currentFormIndex={currentFormIndex}
        onChangeForm={getFormIndexFromCultureName}
        onSubmit={(values) => console.log(values)}
        fields={
          formsList.length > 0
            ? formsList[currentFormIndex].fieldsToCheck
            : null
        }
      />
    </div>
  );
}
