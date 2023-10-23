import { createContext, useContext } from "react"
export type GlobalContext = {
  setIsLoggedIn:(arg: boolean) => void
}
export const MyGlobalContext = createContext<GlobalContext>({
  setIsLoggedIn: () => {}
})
export const useGlobalContext = () => useContext(MyGlobalContext);