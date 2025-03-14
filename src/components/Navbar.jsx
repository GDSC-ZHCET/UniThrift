import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { signout } from "../utils/useSignout";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signout();
    navigate("/login");
  };

  return (
    <nav className="w-full h-[8vh] fixed top-0 left-0 flex justify-between items-center bg-[#86b5af] text-white p-4">
      <div className="flex items-center font-bold text-3xl">
        <img src={logo} alt="Logo" className="h-10"/>
        <Link to="/">UniThrift</Link>
      </div>
      <div className="flex items-center gap-10 font-medium">
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/status">History</Link>
        {currentUser ? (
          <div className="flex items-center gap-4">
            <p className="text-gray-600">{currentUser.email}</p>
            <Link
              to="/upload"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md"
            >
              Sell Product
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-gray-600 hover:bg-gray-600/90 px-4 py-2 text-white rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
