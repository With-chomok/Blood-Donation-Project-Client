import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto">

        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            StyleDecor
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-gray-700 font-medium">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* Dashboard / Login */}
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
