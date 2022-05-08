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

const fields = [
  { type: "text", name: "email", initialValue: "" },
  { type: "password", name: "password", initialValue: "" },
];

export default function LoginForm() {
  return (
    <div className={style.loginHolder}>
      <CustomForm
        formName={ENTER_CREDENTIALS}
        fields={fields}
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
