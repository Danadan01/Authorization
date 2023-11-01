import { useState } from "react";
import { useFormik } from "formik";
import { profileInputsSchema } from "../ValidationSchemas/profileInputsSchema";
import { getUserEmptyDataArr } from "../helpers/getters";
import { setCompletedUser } from "../helpers/storageSetters";


const useProfileForm = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [emptyValuesArr, setEmptyValuesArr] = useState<string[]>(getUserEmptyDataArr);

  const profileForm = useFormik({
    initialValues: {
      age: '',
      gender: '',
    },
    validationSchema: profileInputsSchema,
    onSubmit: (values) => {
      setIsActive(false);
      setCompletedUser(values);
      setEmptyValuesArr(getUserEmptyDataArr);
    }
  });

  return {profileForm, isActive, setIsActive, emptyValuesArr}
}

export default useProfileForm