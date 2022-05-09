import CustomForm from "../../Components/Form";
import { loginSchema } from "../../Components/Form/Validation/login";
import {
  CLICK_HERE,
  ENTER_CREDENTIALS,
  FORGOT_PASSWORD,
  LOGIN,
} from "../../Constants/text";
import style from "../../Assets/Styles/login.module.scss";
import { Link } from "react-router-dom";
import { RESTORE_PASSWORD } from "../../Constants/links";
import { useState, useEffect } from "react";

const requestedForms = [
  {
    name: `Wheat`,
    fields: [
      { type: "text", name: "email", initialValue: "" },
      { type: "password", name: "password", initialValue: "" },
      { type: "password", name: "1", initialValue: "" },
      { type: "password", name: "2", initialValue: "" },
      { type: "password", name: "3", initialValue: "" },
      { type: "password", name: "4", initialValue: "" },
      { type: "password", name: "5", initialValue: "" },
      { type: "password", name: "6", initialValue: "" },
      { type: "password", name: "7", initialValue: "" },
      { type: "password", name: "8", initialValue: "" },
      { type: "password", name: "9", initialValue: "" },
      { type: "password", name: "12", initialValue: "" },
      { type: "password", name: "123", initialValue: "" },
      { type: "password", name: "14", initialValue: "" },
      { type: "password", name: "51", initialValue: "" },
      { type: "password", name: "156", initialValue: "" },
    ],
  },
  {
    name: `Rice`,
    fields: [
      { type: "text", name: "rice", initialValue: "" },
      { type: "text", name: "text", initialValue: "" },
      { type: "text", name: "1", initialValue: "" },
      { type: "text", name: "2", initialValue: "" },
      { type: "text", name: "3", initialValue: "" },
      { type: "text", name: "4", initialValue: "" },
      { type: "text", name: "5", initialValue: "" },
      { type: "text", name: "6", initialValue: "" },
      { type: "text", name: "7", initialValue: "" },
      { type: "text", name: "8", initialValue: "" },
      { type: "text", name: "9", initialValue: "" },
      { type: "text", name: "10", initialValue: "" },
      { type: "text", name: "11", initialValue: "" },
      { type: "text", name: "12", initialValue: "" },
      { type: "text", name: "13", initialValue: "" },
      { type: "text", name: "14", initialValue: "" },
      { type: "text", name: "16", initialValue: "" },
      { type: "text", name: "15", initialValue: "" },
      { type: "text", name: "17", initialValue: "" },
      { type: "text", name: "18", initialValue: "" },
      { type: "text", name: "19", initialValue: "" },
      { type: "text", name: "20", initialValue: "" },
    ],
  },
];

export default function LoginForm() {
  const [currentFormIndex, setFormIndex] = useState(0);
  const [forms, setForms] = useState(null);

  const onFormChange = (name) => {
    const form = forms.findIndex((form) => form.name === name);
    setFormIndex(form);
  };

  useEffect(() => {
    setFormIndex(0);
    setForms(requestedForms);
  }, []);

  return (
    <div className={style.loginHolder}>
      <CustomForm
        onChangeForm={onFormChange}
        currentFormIndex={currentFormIndex}
        formList={forms}
        formHeader={ENTER_CREDENTIALS}
        fields={forms?.[currentFormIndex].fields}
        validationSchema={loginSchema}
        submitText={LOGIN}
        onSubmit={(values) => console.log(values)}
      />
      <span>
        {FORGOT_PASSWORD}
        <Link to={RESTORE_PASSWORD}>{CLICK_HERE}</Link>
      </span>
    </div>
  );
}
