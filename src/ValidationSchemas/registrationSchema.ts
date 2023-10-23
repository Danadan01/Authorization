import * as Yup from "yup";

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}$/;
const lettersRegExp = /[A-Za-z]/;
const today = new Date();

export const registrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .max(40, "Too long")
    .matches(lettersRegExp, "Your first name should contain only letters"),
  lastName: Yup.string()
    .required("Required")
    .max(40, "Too long")
    .matches(lettersRegExp, "Your last name should contain only letters"),
  dateOfBirth: Yup.date().transform((value, originalValue) => {
      const newDate = new Date(originalValue);
      const year = newDate.getFullYear();
      if (year >= 1900) {
        return newDate;
      } else {
        return false;
      }
    }).typeError("Please enter a real date of birth")
    .nullable()
    .required("Required")
    .max(today, "Please enter a real date of birth"), 
  gender: Yup.string().required("Required"), 
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(5, "Too short!")
    .max(15, "Too long!")
    .matches(
      passwordRegExp,
      "Password must contain at least one upper and lower case letter, and one numeric digit."
    ),
  copyPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});