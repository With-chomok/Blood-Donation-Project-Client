import { Link, NavLink } from "react-router";
import useAuth from "../hooks/UseAuth";
import request from "/request.png";
import {
  FaHome,
  FaUsers,
  FaTint,
  FaHandHoldingHeart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Aside = ({ closeMobileMenu }) => {
  const { user, signOutUser, role, loading } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
      isActive
        ? "bg-red-600 text-white shadow-lg shadow-red-200 scale-[1.02]"
        : "text-gray-600 hover:bg-red-50 hover:text-red-600"
    }`;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="hidden lg:block p-8 border-b border-gray-50">
        <Link to="/" className="section-title ">
          🩸 Life<span className="title-highlight">Drop</span>
        </Link>
        <div className="mt-1 inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full">
          {role || "User"} Panel
        </div>
      </div>

      {/* 👤 User Profile Card */}
      <div className="p-6 mx-4 my-4 bg-gray-50 rounded-[2rem] flex flex-col items-center text-center border border-gray-100">
        <div className="relative">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
            alt="profile"
            className="w-20 h-20 rounded-3xl object-cover ring-4 ring-white shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        <div className="mt-4">
          <p className="font-bold text-gray-800 leading-tight">
            {user?.displayName}
          </p>
          <p className="text-xs text-gray-400 mt-1 truncate w-40">
            {user?.email}
          </p>
        </div>
      </div>

      {/* 📋 Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2 ">
        <NavLink
          to="/dashboard"
          end
          className={linkClass}
          onClick={closeMobileMenu}>
          <FaHome className="text-lg" /> Dashboard
        </NavLink>

        {role === "Admin" && (
          <NavLink
            to="/dashboard/all-users"
            className={linkClass}
            onClick={closeMobileMenu}>
            <FaUsers className="text-lg" /> All Users
          </NavLink>
        )}

        {(role === "Donor" || role === "Admin") &&
          (loading ? (
            loading
          ) : (
            <NavLink
              to="/dashboard/add-request"
              className={linkClass}
              onClick={closeMobileMenu}>
              <FaTint className="text-lg" /> Blood Requests
            </NavLink>
          ))}

        <NavLink
          to="/dashboard/my-donation-requests"
          className={linkClass}
          onClick={closeMobileMenu}>
          <img
            src={request}
            className="w-5 h-5 filter grayscale group-hover:grayscale-0"
            alt=""
          />
          My Request
        </NavLink>

        <NavLink to="/donate" className={linkClass} onClick={closeMobileMenu}>
          <FaHandHoldingHeart className="text-lg" /> Funding
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={linkClass}
          onClick={closeMobileMenu}>
          <FaUserCircle className="text-lg" /> Profile
        </NavLink>
      </nav>

      {/* 🚪 Logout Section */}
      <div className="px-6 border-t border-gray-50 bg-white sticky bottom-0">
        <button
          onClick={() => {
            signOutUser();
            if (closeMobileMenu) closeMobileMenu();
          }}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Aside;
