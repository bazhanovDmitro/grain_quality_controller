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
import { ABOUT, RESTORE_PASSWORD } from "../../Constants/links";
import { login } from "../../Services/Auth";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const loginFields = [
  { type: "text", name: "email", initialValue: "" },
  { type: "password", name: "password", initialValue: "" },
];

export default function LoginForm() {
  const { setUserInfo, setRole } = useContext(UserContext);

  const navigate = useNavigate();

  const onLogin = async (values) => {
    const userObj = await login(values);
    if (userObj) {
      setRole(userObj.role);
      setUserInfo(userObj);
      navigate(ABOUT);
    } else alert(`Error`);
  };

  return (
    <div className={style.loginHolder}>
      <CustomForm
        formHeader={ENTER_CREDENTIALS}
        fields={loginFields}
        validationSchema={loginSchema}
        submitText={LOGIN}
        onSubmit={(values) => onLogin(values)}
      />
      <span>
        {FORGOT_PASSWORD}
        <Link to={RESTORE_PASSWORD}>{CLICK_HERE}</Link>
      </span>
    </div>
  );
}
