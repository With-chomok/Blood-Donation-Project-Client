import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">🩸 LifeDrop</h3>
          <p className="text-sm">
            Connecting donors and patients to save lives together.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/donation-requests">Donation Requests</Link></li>
            <li><Link to="/register">Become a Donor</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">📞 +880-1XXXXXXXXX</p>
          <p className="text-sm">📧 support@lifedrop.com</p>
        </div>
      </div>

      <p className="text-center text-sm mt-6">
        © {new Date().getFullYear()} LifeDrop. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
