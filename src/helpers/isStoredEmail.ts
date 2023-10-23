import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

export const isStoredEmail = (email: string): boolean => {
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  if (users) {
    const user = users.find((user => user.email === email));
    if (user) {
      return true
    } else {
      return false
    }
  }
  return false
}