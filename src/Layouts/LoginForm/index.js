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
    ],
  },
  {
    name: `Rice`,
    fields: [
      { type: "text", name: "rice", initialValue: "" },
      { type: "text", name: "text", initialValue: "" },
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
