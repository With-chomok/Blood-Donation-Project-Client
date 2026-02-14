import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DetailsPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`)
      .then(res => {
        console.log(res.data);
        setRequest(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, id]);

  // 🔥 Smart Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-red-600 font-semibold text-lg">
          Loading Request Details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex justify-center items-center p-4">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border-t-8 border-red-600"
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 text-center">
          <Typewriter
            words={["Blood Request Details ❤️"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
          />
        </h2>

        {/* Content */}
        <div className="space-y-4 text-gray-700 text-lg">

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Name:</span> Chomok Das
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Blood Group:</span> A+
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Location:</span> Mymensingh
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Date:</span> 01 jan, 2026
          </motion.p>

        </div>

        {/* Button */}
        <motion.div
          className="mt-8 text-center"
          whileHover={{ scale: 1.1 }}
        >
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300">
            Donate Now
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default DetailsPage;
