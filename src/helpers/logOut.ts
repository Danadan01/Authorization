import { deleteCookie } from "./cookies";
import { StorageTypes } from "../Constants/storage.constants";

export const logOut = () => {
  sessionStorage.removeItem(StorageTypes.currentUser);
  deleteCookie('userId');
}