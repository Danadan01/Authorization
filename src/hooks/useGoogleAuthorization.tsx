import { useState, useEffect } from "react";
import { TokenResponse, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { User } from "../Interfaces/User";
import { StorageTypes } from "../Constants/storage.constants";
import { setCookie } from "../helpers/cookies";
import { deleteCookie } from "../helpers/cookies";

type userData = {
  email: string,
  name: string,
  picture: string
}

function useGoogleAuthorization() {
  const [token, setToken] = useState<string>('');
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const logInGoogle = useGoogleLogin({
    onSuccess: ({access_token}: TokenResponse) => {
      setIsActive(false);
      setToken(access_token)
    },
    onError: (error) => {
      console.log("Login Failed:", error)},
      onNonOAuthError: () => setIsActive(false)
  });

  const logOutGoogle = () => {
    googleLogout();
    sessionStorage.removeItem('currentUser');
    deleteCookie('userId');
  };

  useEffect(() => {
    const setUserDetails = async () => {
      try {
        if (token) {
          const res = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
              },
            }
          );
          const { email, name, picture }: userData = await res.json();
          const user: User = {
            fullName: name,
            age: 0,
            id: Date.now(),
            gender: '',
            email,
            password: '',
            userImg: picture,
          };

          const users: User[] = JSON.parse(localStorage.getItem(StorageTypes.users) as string);
          if (!users) {
            localStorage.setItem(StorageTypes.users, JSON.stringify([user]))
            sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(user));
            setCookie("userId", user.id, 7);
            setIsGoogleUser(true);
          } else {
            const storedUser = users.find(storedUser => storedUser.email === user.email);
            if (storedUser) {
              sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(storedUser));
              setCookie("userId", storedUser.id, 7);
            } else {
              sessionStorage.setItem(StorageTypes.currentUser, JSON.stringify(user));
              localStorage.setItem(StorageTypes.users, JSON.stringify([...users, user]));
              setCookie("userId", user.id, 7);
              setIsGoogleUser(true);
            }
          } 
          navigate('/profile');
        }
      } catch (error) {
        console.error(error);
      }
    };

    setUserDetails();
  }, [token]);

  return {logInGoogle, logOutGoogle, isGoogleUser, isActive, setIsActive};
}
export default useGoogleAuthorization;
