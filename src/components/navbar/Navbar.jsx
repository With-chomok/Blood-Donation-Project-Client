import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/UseAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-red-600 font-semibold" : "hover:text-red-600 transition";

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-extrabold text-red-600">
            🩸 LifeDrop
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-none">
          <ul className="menu menu-horizontal items-center gap-2 font-medium text-gray-700">
            <li>
              <NavLink to="/donation-requests" className={navLinkStyle}>
                Donation Requests
              </NavLink>
            </li>

            {!user ? (
              <li>
                <NavLink to="/login" className={navLinkStyle}>
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/funding" className={navLinkStyle}>
                    Funding
                  </NavLink>
                </li>

                {/* Avatar Dropdown */}
                <li className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          user?.photoURL || "https://i.ibb.co/2kR5zq0/user.png"
                        }
                        alt="user avatar"
                      />
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-48">
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      {user ? (
                        <button
                          onClick={signOutUser}
                          className="text-red-600 hover:bg-red-50">
                          Logout
                        </button>
                      ) : (
                        <NavLink to="/login">Login</NavLink>
                      )}
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
