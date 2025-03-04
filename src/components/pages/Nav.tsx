import { Link, Navigate, useNavigate } from "react-router-dom";

const Nav = () => {
  // Get user login status from localStorage or your auth state management
  const isLoggedIn = localStorage.getItem('user') || false;
  const Navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-50 flex justify-between p-4 bg-gradient-to-b from-black/75 to-transparent text-white">
      <div className="text-red-600 text-2xl font-bold">LOGO</div>
      <div className="flex gap-5 items-center">
        <Link to="/home" className="text-white hover:text-gray-300 transition-colors">
          Home
        </Link>
        {!isLoggedIn && (
          <Link to="/signup" className="text-white hover:text-gray-300 transition-colors">
            Signup
          </Link>
        )}
        {isLoggedIn && (
          <button 
            onClick={() => {
              localStorage.removeItem('user');
              // window.location.reload();
              Navigate('/');
            }}
            className="text-white hover:text-gray-300 cursor-pointer transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
