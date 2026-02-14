import { Link } from "react-router";
import { motion } from "framer-motion";
// import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx"
import { FaMapMarkerAlt, FaCalendarAlt, FaTint } from "react-icons/fa";
import useAuth from "../../../hooks/UseAuth";
// import { useEffect } from "react";
const DonationPreview = () => {
  const { user } = useAuth();

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mx-3  md:mx-10">
          <div className="text-center md:text-left">
            <h2 className="section-title text-gray-800">
              Recent <span className="title-highlight">Donation Requests</span>
            </h2>
            <div className="h-1 w-20 bg-red-600 mx-auto md:mx-0 mt-2"></div>
          </div>
          <Link
            to="/dashboard/my-donation-requests"
            className="btn btn-ghost text-red-600 font-bold hover:bg-red-50 gap-2">
            View All Requests →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:m-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                y: -10,
                backgroundColor: "white",
                boxShadow: "0px 20px 40px rgba(0,0,0,0.05)",
              }}
              className="group p-8 rounded-3xl border border-transparent hover:border-red-100 transition-all duration-300 ">
              <div className="flex  justify-between items-start mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  className="p-4 bg-red-50 rounded-2xl text-red-600 group-hover:bg-red-600 duration-100 animate-pulse group-hover:rotate-12  group-hover:text-white   transition-all">
                  <FaTint size={24} />
                </motion.div>
                <span className="badge badge-error text-white font-bold p-3">
                  A+ Group
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span className="font-medium">Dhaka Medical College</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FaCalendarAlt className="text-red-400" />
                  <span className="font-medium">25 Dec 2025</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50">
                {user ? (
                  <Link
                    to="/details"
                    className="w-full btn bg-gray-800 hover:bg-red-600 text-white border-none rounded-xl transition-all">
                    View Details
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full btn bg-gray-800 hover:bg-red-600 text-white border-none rounded-xl transition-all">
                    View Details
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationPreview;
