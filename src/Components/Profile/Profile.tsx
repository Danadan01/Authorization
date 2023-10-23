import "./profile.css";
import { useEffect, useState} from "react";
import { User } from "../../Interfaces/User";
import { setToStorages } from "../../helpers/setToStorages";
import { logOut } from "../../helpers/logOut";
import { useNavigate } from "react-router-dom";
import { ProfileProps } from "../../Interfaces/ProfileProps";
import { StorageTypes } from "../../Constants/storage.constants";
import useGoogleAuthorization from "../../hooks/useGoogleAuthorization";
import ProfileForm from "../ProfileForm/ProfileForm";

const Profile = ({ setIsLoggedIn, imgSrc, setImgSrc }: ProfileProps) => {
  const { logOutGoogle, isGoogleUser } = useGoogleAuthorization();

  const [, setState] = useState<boolean>(false) //how to make it clever

  const currentUser: User = JSON.parse(
    sessionStorage.getItem(StorageTypes.currentUser) as string
  );
  const { age, email, fullName, gender } = currentUser;
  let { userImg } = currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    setImgSrc(userImg);
    setIsLoggedIn(true);
  }, []);

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        if (reader.result) {
          userImg = reader.result as string;
          setImgSrc(userImg);
          setToStorages("userImg", userImg);
        }
      });
    }
  };

  return (
    <div className="user">
      <div className="user-img">
        <label className="labelLine">
          <span>📷</span>
          <span>Change Image</span>
          <input id="file" type="file" onChange={loadFile} />
        </label>
        <img src={imgSrc} alt="userPhoto" />
      </div>

      <div className="user-info">
        <h3>Name: {fullName}</h3>
        <h3>E-mail: {email}</h3>
        <h3>{age > 0 && `Age: ${age}`}</h3>
        <h3>{gender && `Gender: ${gender}`}</h3>

        <ProfileForm setState={setState}/>
      </div>


      <button className="logOutButton"
        onClick={() => {
          isGoogleUser ? logOutGoogle() : logOut();
          navigate("/");
          setIsLoggedIn(false);
        }}
      >
        Log out
      </button>

    </div>
  );
};

export default Profile;
