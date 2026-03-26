import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DetailsPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/requests/${id}`)
      .then((res) => {
        // console.log("Request Data:", res.data);
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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

  if (!request) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-600 text-xl font-semibold">Request not found!</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="shadow-2xl rounded-2xl p-8 w-full max-w-2xl border-t-8 border-red-600"
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
            <span className="font-semibold text-red-600">Name:</span>{" "}
            {request.requesterName || "N/A"}
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Blood Group:</span>{" "}
            {request.bloodGroup || "N/A"}
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Location:</span>{" "}
            {request.district}, {request.upazila}
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Hospital:</span>{" "}
            {request.hospital || "N/A"}
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Contact:</span>{" "}
            {request.contact || "N/A"}
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Date:</span>{" "}
            {new Date(request.createdAt).toLocaleDateString()}
          </motion.p>

          <motion.p whileHover={{ scale: 1.05 }}>
            <span className="font-semibold text-red-600">Additional Info:</span>{" "}
            {request.details || "N/A"}
          </motion.p>
        </div>

        {/* Button */}
        <motion.div className="mt-8 text-center gap-2" whileHover={{ scale: 1.1 }}>
          <div className="flex gap-2 items-center justify-center">
            <Link
              to="/donate"
              className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
            >
              Donate Now
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DetailsPage;