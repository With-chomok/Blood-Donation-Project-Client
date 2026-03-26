import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaHeartbeat, FaArrowRight, FaHandHoldingHeart } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const CallToAction = () => {
  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-16 lg:p-20 overflow-hidden  shadow-red-100/50 border border-red-100 mx-auto"
        >
          {/* Subtle Decorative Glows - Hidden on very small screens to prevent horizontal scroll */}
          <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="hidden sm:block absolute bottom-0 left-0 w-64 h-64 bg-red-50/50 rounded-full -ml-32 -mb-32 blur-2xl"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 📢 Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8"
              >
                <FaHeartbeat className="animate-pulse" /> Become a Hero
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-base-content leading-tight mb-6">
                Ready to Save a <br />
                <span className="text-red-500">
                  <Typewriter
                    options={{
                      strings: ["Life Today?", "Future?", "Family?"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </h2>

              <p className="text-base-content/70 text-sm md:text-lg mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0">
                Your 15 minutes and one pint of blood can save up to three
                lives. Join our community of life-savers today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/register"
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-8 h-14 rounded-2xl font-black text-base gap-3 shadow-md shadow-red-200 transition-all w-full"
                  >
                    Join Now <FaArrowRight />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/donation-requests"
                    className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 px-8 h-14 rounded-2xl border border-gray-200 shadow-md font-black text-base w-full"
                  >
                    View Requests
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* 🎨 Visual Side */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                {/* Floating Shape */}
                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-red-500 to-red-700 rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center shadow-2xl rotate-6 group">
                  <FaHandHoldingHeart className="text-white text-6xl md:text-8xl -rotate-6 transition-transform group-hover:scale-110" />
                </div>

                {/* Small Floating Stats Card */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-red-50 flex items-center gap-3 md:gap-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl">
                    ❤️
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-black text-gray-800 tracking-tight leading-none">
                      2.5k+
                    </p>
                    <p className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400 mt-1">
                      Lives Saved
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;