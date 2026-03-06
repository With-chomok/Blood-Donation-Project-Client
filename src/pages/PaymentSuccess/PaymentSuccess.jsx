import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!sessionId) return;

    axiosInstance
      .post(`/success-payment?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [axiosInstance, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className=" shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border border-red-100"
      >
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl text-green-600">✓</span>
          </div>
        </motion.div>

        {/* Typewriter Title */}
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          <Typewriter
            words={["Payment Successful!", "Thank You for Your Donation ❤️"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        <p className="text-base-content/70 mb-6">
          Your donation has been completed successfully.
          <br />
          We truly appreciate your support in saving lives.
        </p>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/donate"
            className="btn bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl shadow-lg shadow-red-300/40"
          >
            Back to Donate
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;