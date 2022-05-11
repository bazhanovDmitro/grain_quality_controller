import Form from "../Components/Form/index";
import { CONFIRM_CHANGES, ENTER_NEW_CRED } from "../Constants/text";
import { newCredSchema } from "../Validation/changeCred";
import style from "../Assets/Styles/changeCred.module.scss";
import HintCard from "../Components/HintCard";
import { useState } from "react";

const fields = [
  { type: "text", name: "email", initialValue: "" },
  { type: "password", name: "password", initialValue: "" },
  { type: "password", name: "password confirmation", initialValue: "" },
];

export default function ChangeCredentials() {
  const [hintVisibility, setVisibility] = useState(false);

  const invokeHint = () => {
    setVisibility((prev) => {
      if (!prev) return true;
      setTimeout(() => setVisibility(true), 100);
      return false;
    });
  };

  const hint = hintVisibility ? (
    <HintCard
      header={"Credential change"}
      text={"Your credentials was changed successfully"}
      closeButton={true}
      onClose={() => setVisibility(false)}
      timing={5000}
      offScreenAnimation={true}
    />
  ) : null;

  return (
    <div className={style.holder}>
      <Form
        formHeader={ENTER_NEW_CRED}
        fields={fields}
        submitText={CONFIRM_CHANGES}
        validationSchema={newCredSchema}
        onSubmit={(values) => invokeHint(true)}
      />
      {hint}
    </div>
  );
}
