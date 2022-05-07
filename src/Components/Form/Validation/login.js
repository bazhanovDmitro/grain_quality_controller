import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().min(15, "Minimum 15 symbols").required("Required field"),
  password: Yup.string()
    .min(15, "Minimum 15 symbols")
    .required("Required field"),
});
