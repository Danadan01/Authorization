import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

export const setToStorages = <K extends keyof User>(key: K, value: User[K] ): void  => {
  const currentUser: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  const {id} = currentUser;

  currentUser[key] = value;
  sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(currentUser));  
  
  users.forEach(user => {
    if (user.id === id) {
      user[key] = value;
      localStorage.setItem(StorageTypes.users, JSON.stringify(users));
    }
  })

}