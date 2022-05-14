import * as Yup from "yup";
import { MIN_NAME_LENGTH } from "../Constants/numbers";
import { passwordRegExp } from "../Constants/regExp";
import {
  EMAIL_FIELD,
  MIN_NAME,
  PASSWORD_MUST_CONTAIN,
  REQUIRED_FIELD,
} from "../Constants/text";

export const newUserSchema = Yup.object({
  firstName: Yup.string()
    .required(REQUIRED_FIELD)
    .min(MIN_NAME_LENGTH, MIN_NAME),
  lastName: Yup.string()
    .required(REQUIRED_FIELD)
    .min(MIN_NAME_LENGTH, MIN_NAME),
  email: Yup.string().required(REQUIRED_FIELD).email(EMAIL_FIELD),
  password: Yup.string()
    .required(REQUIRED_FIELD)
    .matches(passwordRegExp, PASSWORD_MUST_CONTAIN),
});
