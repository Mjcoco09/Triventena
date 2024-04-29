import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import ProfileButton from "../Navigation/ProfileButton";

const Navbar = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <nav className="navbar">
      <div className="nav_logo">
      <Link className="logo_link" to="/">Triventena</Link>
      </div>
      <ul className="navLinks">
        <li>
          <Link to="/cart" className="cart_Link">
            <i className="fas fa-shopping-cart"></i>
            <span>
            Cart
            <span className="CartCount"></span>
            </span>
          </Link>
        </li>
        {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </ul>

    </nav>
  );
};

export default Navbar;
