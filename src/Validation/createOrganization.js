import * as Yup from "yup";
import {
  MAX_ORGANIZATION_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MIN_ORGANIZATION_NAME_LENGTH,
} from "../Constants/numbers";
import { passwordRegExp } from "../Constants/regExp";
import {
  EMAIL_FIELD,
  MIN_NAME,
  ORGANIZATION_NAME_LENGTH_ECXEPTION,
  ORGANIZATION_NAME_TO_LONG,
  PASSWORD_MUST_CONTAIN,
  REQUIRED_FIELD,
} from "../Constants/text";

export const createOrganizationSchema = Yup.object({
  organizationName: Yup.string()
    .required(REQUIRED_FIELD)
    .min(MIN_ORGANIZATION_NAME_LENGTH, ORGANIZATION_NAME_LENGTH_ECXEPTION)
    .max(MAX_ORGANIZATION_NAME_LENGTH, ORGANIZATION_NAME_TO_LONG),
  managerName: Yup.string()
    .required(REQUIRED_FIELD)
    .min(MIN_NAME_LENGTH, MIN_NAME),
  managerLastName: Yup.string()
    .required(REQUIRED_FIELD)
    .min(MIN_NAME_LENGTH, MIN_NAME),
  managerEmail: Yup.string().required(REQUIRED_FIELD).email(EMAIL_FIELD),
  managerPassword: Yup.string()
    .required(REQUIRED_FIELD)
    .matches(passwordRegExp, PASSWORD_MUST_CONTAIN),
});
