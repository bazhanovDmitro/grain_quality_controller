import * as Yup from "yup";
import { EMAIL_FIELD, REQUIRED_FIELD } from "../../../Constants/text";

export const loginSchema = Yup.object({
  email: Yup.string().email(EMAIL_FIELD).required(REQUIRED_FIELD),
  password: Yup.string().required(REQUIRED_FIELD),
});
