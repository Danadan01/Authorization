import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

export const getUserEmptyDataArr = (): string[] => {
  const currentUser: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
  const result = [];

  for (const el in currentUser) {
    if (el === 'password' || el === 'email' || el === 'id' || el === 'userImg' || el === 'fullName') {
      continue;
    } else {
      if (currentUser[el] === '' || currentUser[el] === 0) {
        result.push(el);
      }
    }
  } 

  return result
}