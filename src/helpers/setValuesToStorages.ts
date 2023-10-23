import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

// type Values = {
//   [K in keyof User]: User[K]; TS question
// }

export const setValuesToStorages = <K extends keyof User>(values: {[key: string]: User[K]}): void  => {
  const currentUser: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  const {id} = currentUser;

  const entries = Object.entries(values);
  entries.forEach((entry) => {
    let [key, value] = entry;

    if (!value) { //for slicing down initial values of formik
      return 
    }

    if (typeof currentUser[key] === 'number') { //for setting number values to User
      value = +value;     
    }

    currentUser[key] = value;
    sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(currentUser));
    users.forEach(user => {
      if (user.id === id) {
        user[key] = value;
        localStorage.setItem(StorageTypes.users, JSON.stringify(users));
      }
    })
  })

}