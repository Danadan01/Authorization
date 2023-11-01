import LogIn from "./Components/LogIn/LogIn";
import Registration from "./Components/Registration/Registration";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { isUser } from "./helpers/checkers";
import { User } from "./Interfaces/User";
import { StorageTypes } from "./Constants/storage.constants";
import { MyGlobalContext } from "./hooks/useGlobalContext";
import "./app.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (isUser()) {
      const currentUser: User = JSON.parse(
        sessionStorage.getItem(StorageTypes.currentUser) as string
      );
      setImgSrc(currentUser.userImg);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <MyGlobalContext.Provider value={{ setIsLoggedIn }}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} imgSrc={imgSrc} />

        <div className="routes-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/profile"
              element={
                <Profile
                  setIsLoggedIn={setIsLoggedIn}
                  imgSrc={imgSrc}
                  setImgSrc={setImgSrc}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </MyGlobalContext.Provider>
  );
}

export default App;
