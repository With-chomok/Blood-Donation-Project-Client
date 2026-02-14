import { href, Link } from "react-router";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/*  Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <Link to='/' className="w-10 h-10 bg-white-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                <span className="text-white text-2xl">🩸</span>
              </Link>
              <h3 className="text-2xl font-black text-white tracking-tighter">
                Life<span className="text-red-600">Drop</span>
              </h3>
            </motion.div>
            <div className="text-sm leading-relaxed mb-6 font-medium">
              <Typewriter
                options={{
                  strings: ["Connecting donors and patients.", "Saving lives together.", "Your small drop, their big hope."],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  wrapperClassName: "text-red-500 font-bold"
                }}
              />
              <p className="mt-2 text-gray-400">Join our community and be a hero today by donating blood to those in need.</p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[FaFacebook,
               FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="https://www.facebook.com/dipoldas1122/"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 border border-gray-700 hover:border-red-500 shadow-lg"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/*  Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-red-600 pl-4">Quick Links</h4>
            <ul className="space-y-4 text-sm font-semibold">
              {["Home", "Donation Requests", "Become a Donor", "Funding", "About Us"].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 8 }}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-red-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/*  Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-red-600 pl-4">Contact Us</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-red-500 shrink-0 border border-gray-700">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase font-black">Phone Number</p>
                  <p className="text-white font-bold tracking-wide">+8801798-571413</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-red-500 shrink-0 border border-gray-700">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase font-black">Email Support</p>
                  <p className="text-white font-bold tracking-wide">support@lifedrop.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/*  Newsletter / Location */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-red-600 pl-4">Location</h4>
            <div className="flex items-start gap-4 mb-6">
               <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-red-500 shrink-0 border border-gray-700">
                  <FaMapMarkerAlt />
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  Level-4, 121/A Chorpara Avenue,<br />
                  Mymensingh - 1212, Bangladesh.
                </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
              <p className="text-xs font-bold text-red-500 mb-2 uppercase">Emergency Service</p>
              <p className="text-[11px] leading-snug text-gray-400">Available 24/7 for urgent blood requirements across the country.</p>
            </div>
          </div>
        </div>

        {/*  Bottom Bar */}
        <div className="mt-8  pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
          <p>© {new Date().getFullYear()} LifeDrop. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-red-600 transition-all">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-red-600 transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;