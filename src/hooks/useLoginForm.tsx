import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { logInSchema } from "../ValidationSchemas/loginSchema";
import { getUser } from "../helpers/getUser";
import { StorageTypes } from "../Constants/storage.constants";
import { setCookie } from "../helpers/cookies";


const useLoginForm = () => {
  const navigate = useNavigate();

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: logInSchema,
    onSubmit: ({ email, password }) => {
      const currentUser = getUser(email, password);
      if (currentUser) {
        sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(currentUser));
        setCookie("userId", currentUser.id, 7);
        navigate("/profile");
      } else {
        login.setFieldError("password", "Wrong e-mail or password");
      }
    },
  });

  return login
}

export default useLoginForm