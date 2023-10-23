import LogIn from "./Components/LogIn/LogIn";
import Registration from "./Components/Registration/Registration";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { rememberUser } from "./helpers/rememberUser";
import { User } from "./Interfaces/User";
import { StorageTypes } from "./Constants/storage.constants";
import { MyGlobalContext } from "./hooks/useGlobalContext";
import "./app.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    if (rememberUser()) {
      const currentUser: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
      setImgSrc(currentUser.userImg);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="app">
      <MyGlobalContext.Provider value={{setIsLoggedIn}}>
        <Header isLoggedIn={isLoggedIn} imgSrc={imgSrc}/>
      </MyGlobalContext.Provider>
      <div className="routes-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/profile"
            element={<Profile setIsLoggedIn={setIsLoggedIn} imgSrc={imgSrc} setImgSrc={setImgSrc}/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
