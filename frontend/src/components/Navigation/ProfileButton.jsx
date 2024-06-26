import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./ProfileButton.css";
function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate("/");
    closeMenu();
  };

  const ulClassName = `profile-dropdown ${showMenu ? "visible" : "hidden"}`;

  return (
    <>
      {/* <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button> */}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="navLogin">
            <li>{user.username}</li>
            <li>
              {"Hello "}
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <button className="logOut" onClick={logout}>
                Log Out
              </button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <OpenModalButton
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out",
                }}
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out",
                }}
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
