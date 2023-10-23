import * as Yup from "yup";

export const logInSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});