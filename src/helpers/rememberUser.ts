import { User } from "../Interfaces/User";
import { getCookie } from "./cookies";
import { StorageTypes } from "../Constants/storage.constants";

export const rememberUser = (): boolean => {
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);

  if (users) {
    const cookie = getCookie("userId");
    const currentUser = users.find((user) => user.id === +cookie);
      if (currentUser) {
        sessionStorage.setItem(
          StorageTypes.currentUser,
          JSON.stringify(currentUser)
        );
        return true;
      }
  }

  return false
}
