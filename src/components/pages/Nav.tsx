import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Button } from "../ui/button";

const Nav = () => {
  // Get user login status from localStorage or your auth state management
  // const isLoggedIn = localStorage.getItem('user') || false;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="fixed top-0 w-full z-50 flex justify-between p-4 bg-gradient-to-b from-black/75 to-transparent text-white">
      <div className="text-red-600 text-2xl font-bold">LOGO</div>
      <div className="flex gap-5 items-center">
        <Link to="/home" className="text-white hover:text-gray-300 transition-colors">
          Home
        </Link>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/">
            <Button>Login</Button>
          </Link>
        )}
        
      </div>
    </div>
  );
};

export default Nav;
