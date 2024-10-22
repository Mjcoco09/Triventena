// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { useSelector } from "react-redux";
// import ProfileButton from "../Navigation/ProfileButton";

// const Navbar = ({ isLoaded }) => {
//   const sessionUser = useSelector((state) => state.session.user);
//   return (
//     <nav className="navbar">
//       <div className="nav_logo">
//       <Link className="logo_link" to="/">Triventena</Link>
//       <br></br>
//       <Link className="logo_link" to="/wishList">Wishlist</Link>
//       </div>
//       <ul className="navLinks">
//         <li>
//           <Link to="/cart" className="cart_Link">
//             <i className="fas fa-shopping-cart"></i>
//             <span>
//             Cart
//             </span>
//           </Link>
//         </li>
//         {isLoaded && (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//       </ul>

//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import ProfileButton from "../Navigation/ProfileButton";

const Navbar = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navbar">
      <div className="nav_logo">
        {/* Existing link for the logo */}
        <Link className="logo_link" to="/">Triventena</Link>
      </div>
      <ul className="navLinks">
        {/* Existing Wishlist Link */}
        <li>
          <Link to="/wishList" className="wishlist_Link">
            <i className="fas fa-heart"></i>
            <span>Wishlist</span>
          </Link>
        </li>

        {/* Added: New Link for Recently Viewed */}
        <li>
          <Link to="/recents" className="recentlyViewed_Link">
            <i className="fas fa-eye"></i> {/* Icon for Recently Viewed */}
            <span>Recently Viewed</span>
          </Link>
        </li>

        {/* Existing Cart Link */}
        <li>
          <Link to="/cart" className="cart_Link">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
          </Link>
        </li>

        {/* Existing Profile Button (conditioned on `isLoaded`) */}
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
