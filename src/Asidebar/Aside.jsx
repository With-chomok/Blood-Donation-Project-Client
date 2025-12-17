import { NavLink } from "react-router";
import useAuth from "../hooks/UseAuth";

const Aside = () => {
  const { user, signOutUser } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
     ${
       isActive
         ? "bg-red-600 text-white shadow-md"
         : "text-gray-700 hover:bg-red-100"
     }`;

  return (
    <aside className="w-64 bg-white shadow-xl min-h-screen hidden md:block">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-extrabold text-red-600">🩸 LifeDrop</h1>
        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          src={user?.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
          alt="admin"
          className="w-10 h-10 rounded-full ring ring-red-500 ring-offset-2"
        />
        <div>
          <p className="font-semibold text-gray-800">{user?.displayName}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        <NavLink to="/dashboard" end className={linkClass}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/dashboard/all-users" className={linkClass}>
          👥 All Users
        </NavLink>

        <NavLink to="/dashboard/add-request" className={linkClass}>
          🩸 Blood Requests
        </NavLink>

        <NavLink to="/dashboard/funding" className={linkClass}>
          💰 Funding
        </NavLink>

        <NavLink to="/dashboard/profile" end className={linkClass}>
          👤 Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={signOutUser}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl
          bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition cursor-pointer">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;
