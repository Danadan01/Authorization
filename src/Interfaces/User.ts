export interface User {
  age: number,
  email: string,
  fullName: string,
  gender: string,
  password: string,
  id: number,
  userImg: string,
  [key: string]: string | number
}
