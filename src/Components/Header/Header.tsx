import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { headerProps } from "../../Interfaces/headerProps";
import SubMenu from "../Sub-menu/SubMenu";
import useIsOutsideClick from "../../hooks/useIsOutsideClick";
import "./header.scss";

const Header = ({ isLoggedIn, imgSrc }: headerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const subMenuWrapper = useRef<HTMLDivElement>(null);
  const isOutsideClick = useIsOutsideClick(subMenuWrapper);

    useEffect(() => {
      isOutsideClick && setIsOpen(false);
    }, [isOutsideClick])

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img src="../logo.png" alt="Site_logo" className="header-logo"/>
        </Link>
      </div>

      <div className="header-right">
        {isLoggedIn ? (
          <div ref={subMenuWrapper}>
            <img className="header-img" src={imgSrc} alt="profile pic" onClick={() => setIsOpen(!isOpen)}/>
            <SubMenu isOpen={isOpen} setIsOpen={setIsOpen}/> 
          </div>
        ) : (
          <>
            <Link to="/login">
              <button>Sign in</button>
            </Link>
            <Link to="/registration">
              <button>Sign up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
