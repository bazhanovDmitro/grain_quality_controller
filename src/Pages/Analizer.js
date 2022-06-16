import style from "../Assets/Styles/analizer.module.scss";
import Form from "../Components/Form";
import { ANALIZER_TEXT, ANALIZE_TEXT } from "../Constants/text";
import { analize, getNorms } from "../Services/Analizer";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import Spinner from "../Components/Spinner/index";

export default function Analizer() {
  const [formsList, setList] = useState([]);
  const [currentFormIndex, setCurrent] = useState(0);
  const [isReady, setReady] = useState(false);

  const { userInfo } = useContext(UserContext);

  const getFormIndexFromCultureName = (cultureName) => {
    const cultureIndex = formsList.findIndex(
      (form) => form.cultureName === cultureName
    );
    setCurrent(cultureIndex);
  };

  useEffect(() => {
    getNorms().then((resp) => {
      setList(resp);
      setReady(true);
    });
  }, []);

  return (
    <div className={style.page}>
      {isReady ? (
        <Form
          formHeader={ANALIZER_TEXT}
          submitText={ANALIZE_TEXT}
          formList={formsList}
          currentFormIndex={currentFormIndex}
          onChangeForm={getFormIndexFromCultureName}
          onSubmit={(values) =>
            analize(
              userInfo.UserId,
              userInfo.OrganizationId,
              values,
              formsList[currentFormIndex].cultureName,
              formsList[currentFormIndex].id
            )
          }
          fields={
            formsList.length > 0
              ? formsList[currentFormIndex].fieldsToCheck
              : null
          }
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
