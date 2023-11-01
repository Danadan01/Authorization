import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";
import { getClearValues } from "./getters";

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

export const setCompletedUser = <K extends keyof User>(values: {[key: string]: User[K]}): void  => {
  const currentUser: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  const {id} = currentUser;
  const clearValues = getClearValues(values);

  const completedUser = {...currentUser, ...clearValues};
  
  sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(completedUser));

  users.forEach((user, i) => {
    if (user.id === id) {
      users.splice(i, 1, completedUser);
      localStorage.setItem(StorageTypes.users, JSON.stringify(users));
    }
  })
}