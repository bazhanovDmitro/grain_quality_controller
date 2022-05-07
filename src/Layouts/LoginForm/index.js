import CustomForm from "../../Components/Form";
import { loginSchema } from "../../Components/Form/Validation/login";
import { LOGIN } from "../../Constants/text";

const fields = [
  { type: "text", name: "email", initialValue: "email" },
  { type: "password", name: "password", initialValue: "pass" },
  { type: "text", name: "1", initialValue: "email" },
  { type: "text", name: "2", initialValue: "pass" },
  { type: "text", name: "3", initialValue: "email" },
  { type: "password", name: "4", initialValue: "pass" },
  { type: "text", name: "5", initialValue: "email" },
  { type: "password", name: "6", initialValue: "pass" },
  { type: "password", name: "7", initialValue: "pass" },

  { type: "password", name: "14", initialValue: "pass" },
  { type: "text", name: "15", initialValue: "email" },
  { type: "password", name: "16", initialValue: "pass" },
  { type: "password", name: "17", initialValue: "pass" },

  { type: "password", name: "34", initialValue: "pass" },
  { type: "text", name: "35", initialValue: "email" },
  { type: "password", name: "36", initialValue: "pass" },
  { type: "password", name: "37", initialValue: "pass" },
];

export default function LoginForm() {
  return (
    <CustomForm
      onChangeForm={true}
      fields={fields}
      validationSchema={loginSchema}
      submitText={LOGIN}
      onSubmit={(values) => console.log(values)}
    />
  );
}
