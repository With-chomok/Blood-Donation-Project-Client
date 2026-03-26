import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-white px-4">
      <div className="relative flex flex-col items-center w-full max-w-xs">
        
        {/* 🏥 Central Animated Blood Bag / Vessel */}
        <div className="relative w-20 h-28 md:w-28 md:h-36 border-[3px] md:border-4 border-gray-100 rounded-b-[2rem] rounded-t-lg p-1 shadow-inner overflow-hidden">
          {/* Liquid Filling Animation */}
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-700 to-red-500 w-full"
          >
            {/* Wave Effect */}
            <motion.div
              animate={{ x: ["-100%", "0%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute -top-3 left-0 w-[200%] h-6 bg-red-400/30 blur-sm"
              style={{ borderRadius: "40%" }}
            />
          </motion.div>
          
          {/* Shine on the bag */}
          <div className="absolute top-0 left-2 w-1.5 h-full bg-white/20 rounded-full blur-[1px]"></div>
        </div>

        {/* ⚡ Heartbeat (EKG) Line Animation */}
        <div className="mt-8 md:mt-10 relative w-32 md:w-48 h-10 md:h-12 flex items-center justify-center">
          <svg
            viewBox="0 0 100 20"
            className="w-full stroke-red-500 fill-none stroke-[3] stroke-round"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              d="M0,10 L30,10 L35,2 L45,18 L50,10 L100,10"
            />
          </svg>
        </div>

        {/* 📝 Loading Text with Stagger Effect */}
        <div className="mt-6 md:mt-8 flex flex-col items-center">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1.5 md:gap-2"
          >
            <span className="text-lg md:text-xl font-black text-gray-800 uppercase tracking-[0.15em] md:tracking-widest">
              Saving
            </span>
            <span className="text-lg md:text-xl font-black text-red-600 uppercase tracking-[0.15em] md:tracking-widest">
              Lives
            </span>
          </motion.div>
          
          <div className="mt-3 md:mt-4 flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* 🛡️ Trust Badge */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 md:mt-12 text-gray-400 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-center"
        >
          Secure Blood Network
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;