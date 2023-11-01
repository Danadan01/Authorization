import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";

export const getAge = (dateString: string): number => {
  const today = new Date(),
    birthDay = new Date(dateString),
    month = today.getMonth() - birthDay.getMonth();
  let age = today.getFullYear() - birthDay.getFullYear();
  if (month < 0 || (month === 0 && today.getDate() < birthDay.getDate())) {
    age--;
  }
  return age;
};


export const getUser = (email: string, password: string): User | null => { 
  const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
  if (users) {
    return users.find((user => (user.email === email && user.password === password))) || null;
  } else {
    return null;
  }
}

export const getUserEmptyDataArr = (): string[] => {

  const currentUser: User = JSON.parse(
    sessionStorage.getItem(StorageTypes.currentUser) as string
  );
  const result = [];

  for (const el in currentUser) {
    if (el === 'password') continue;
    
    if (currentUser[el] === "" || currentUser[el] === 0) {
      result.push(el);
    }
  }

  return result;
};

export const getClearValues = (obj: {[key: string]: string | number}) => {

  const objCopy = {...obj};

  for (const key in objCopy) {
    const value = objCopy[key];
    if (!value) {
      delete objCopy[key];
    } else if (!isNaN(+value)) {
      objCopy[key] = +value;
    }
  }

  return objCopy;
}