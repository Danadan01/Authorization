import { Link } from "react-router-dom";
import { StorageTypes } from "../../Constants/storage.constants";
import { User } from "../../Interfaces/User";
import { logOut } from "../../helpers/logOut";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { SubMenuProps } from "../../Interfaces/subMenuProps";
import useGoogleAuthorization from "../../hooks/useGoogleAuthorization";
import './subMenu.css';

const SubMenu = ({isOpen, setIsOpen}: SubMenuProps) => {
  const {fullName, userImg}: User = JSON.parse(sessionStorage.getItem(StorageTypes.currentUser) as string);
  const { logOutGoogle, isGoogleUser} = useGoogleAuthorization();
  const {setIsLoggedIn} = useGlobalContext();
  let subMenuClass;
  if(isOpen) {
    subMenuClass = "sub-menu-wrapper openMenu";
  } else {
    subMenuClass = "sub-menu-wrapper";
  }

  return (
    <div className={subMenuClass} >
      <div className="sub-menu">
        <div className="user-info">
          <img src={userImg} alt="userimage" />
          <h3>{fullName}</h3>
        </div>
        <hr />

        <Link to='/profile' className="sub-menu-link" onClick={() => setIsOpen(false)}>
          <img src="../profile_icon.png" alt="profile-icon" />
          <p>Your profile</p>
          <span>{'>'}</span>
        </Link>

        <Link to='/' className="sub-menu-link" onClick={() => {
          isGoogleUser ? logOutGoogle() : logOut();
          setIsOpen(false);
          setIsLoggedIn(false) 
        }}>
          <img src="../logout_icon.png" alt="logout-icon" />
          <p>Logout</p>
          <span>{'>'}</span>
        </Link>
      </div>
    </div>
  )
}

export default SubMenu