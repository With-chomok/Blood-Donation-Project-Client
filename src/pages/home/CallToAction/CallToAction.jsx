import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaHeartbeat, FaArrowRight, FaHandHoldingHeart } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const CallToAction = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-[4rem] p-10 md:p-20 overflow-hidden shadow-2xl shadow-red-500/10 border border-red-50 mx-10">
          {/*  Subtle Decorative Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50/50 rounded-full -ml-32 -mb-32 blur-2xl"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* 📢 Text Content */}
            <div className="text-center lg:text-left">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
                <FaHeartbeat className="animate-pulse" /> Become a Hero
              </motion.div>

              <h2 className="section-title justify-center lg:justify-start  mb-6">
                Ready to Save a <br />
                <span className="title-highlight">
                  <Typewriter
                    options={{
                      strings: ["Life Today?", "Future?", "Family?"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </h2>

              <p className="section-subtitle mb-10 max-w-lg mx-auto lg:mx-0">
                Your 15 minutes and one pint of blood can save up to three
                lives. Join our community of life-savers today.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="btn bg-red-600 hover:bg-red-700 text-white px-10 h-16 rounded-2xl border-none shadow-xl shadow-red-200 font-black text-lg gap-3">
                    Join Now <FaArrowRight />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/donation-requests"
                    className="btn bg-white hover:bg-gray-50 text-gray-800 px-10 h-16 rounded-2xl border border-gray-200 shadow-lg font-black text-lg">
                    View Requests
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* 🎨 Visual Side */}
            <div className="relative flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative">
                {/* Floating Shape */}
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-red-500 to-red-700 rounded-[3.5rem] flex items-center justify-center shadow-2xl rotate-6 group">
                  <FaHandHoldingHeart className="text-white text-8xl -rotate-6 transition-transform group-hover:scale-110" />
                </div>

                {/* Small Floating Stats Card */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-red-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl">
                    ❤️
                  </div>
                  <div>
                    <p className="text-xl font-black text-gray-800 tracking-tight">
                      2.5k+
                    </p>
                    <p className="text-[10px] uppercase font-bold text-gray-400">
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
