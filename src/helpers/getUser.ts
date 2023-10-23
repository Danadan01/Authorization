import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

export const getUser = (email: string, password: string): User | null => {
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  if (users) {
    const user = users.find((user => (user.email === email && user.password === password)))
    if (user) {
      return user
    } else {
      return null
    }
  } else {
    return null
  }
}


