import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

export const isUserDataComplete = (): boolean => {
  const currentUser: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
  let result: boolean = false;

  for (const el in currentUser) {
    if (el === 'password' || el === 'email' || el === 'id' || el === 'userImg' || el === 'fullName') {
      continue
    } else {
      if (currentUser[el] === '' || currentUser[el] === 0) {
        result = false;
        return result
      } else {
        result = true;
      }
    }
  } 

  return result
}

