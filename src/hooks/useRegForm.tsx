import { useFormik } from "formik";
import { setCookie } from "../helpers/cookies";
import { isStoredEmail } from "../helpers/isStoredEmail";
import { registrationSchema } from "../ValidationSchemas/registrationSchema";
import { StorageTypes } from "../Constants/storage.constants";
import { User } from "../Interfaces/User";
import { getAge } from "../helpers/getAge";
import { useNavigate } from "react-router-dom";


const useRegForm = () => {

  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  const navigate = useNavigate();

  const registration = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      password: "",
      copyPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: ({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      password,
    }) => {
      if (isStoredEmail(email)) {
        registration.setFieldError("email", "User with such e-mail already exists");
      } else {
        const age = getAge(dateOfBirth);
        const id = Date.now();
        const user: User = {
          fullName: `${firstName} ${lastName}`,
          age,
          id,
          gender,
          email,
          password,
          userImg: "./no-user-photo.jpg",
        };

        sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(user));
        setCookie("userId", id, 7);
        if (!users) {
          localStorage.setItem(StorageTypes.users, JSON.stringify([user]));
        } else {
          localStorage.setItem(StorageTypes.users, JSON.stringify([...users, user]));
        }
        navigate("/profile");
      }
    },
  });

  return registration;
}

export default useRegForm