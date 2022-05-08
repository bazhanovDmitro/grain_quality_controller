import CustomForm from "../../Components/Form";
import { loginSchema } from "../../Components/Form/Validation/login";
import { ENTER_CREDENTIALS, LOGIN } from "../../Constants/text";

const fields = [
  { type: "text", name: "email", initialValue: "" },
  { type: "password", name: "password", initialValue: "" },
];

export default function LoginForm() {
  return (
    <CustomForm
      formName={ENTER_CREDENTIALS}
      fields={fields}
      validationSchema={loginSchema}
      submitText={LOGIN}
      onSubmit={(values) => console.log(values)}
    />
  );
}
