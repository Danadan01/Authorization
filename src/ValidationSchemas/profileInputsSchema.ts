import * as Yup from "yup";

export const profileInputsSchema = Yup.object().shape({
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be greater than zero")
    .min(1, "Please enter real age")
    .max(100, "Please enter real age"),
  gender: Yup.string(),
});
