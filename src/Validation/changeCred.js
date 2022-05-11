import * as Yup from "yup";
import {
  EMAIL_FIELD,
  PASSWORDS_MUST_MATCH,
  PASSWORD_MUST_CONTAIN,
  REQUIRED_FIELD,
} from "../Constants/text";
import { passwordRegExp } from "../Constants/regExp";

export const newCredSchema = Yup.object({
  email: Yup.string().email(EMAIL_FIELD).required(REQUIRED_FIELD),
  password: Yup.string()
    .matches(passwordRegExp, PASSWORD_MUST_CONTAIN)
    .required(REQUIRED_FIELD),
  [`password confirmation`]: Yup.string()
    .oneOf([Yup.ref("password"), null], PASSWORDS_MUST_MATCH)
    .required(REQUIRED_FIELD),
});
