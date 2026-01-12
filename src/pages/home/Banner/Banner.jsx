import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaHeartbeat, FaSearch, FaUserPlus } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
    
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50/50 rounded-full blur-[100px] opacity-40 -ml-20 -mb-20 "></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 mx-3  md:mx-10 items-center">
          
          {/* 📝 Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              <FaHeartbeat className="animate-pulse" /> Every Drop Matters
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-title leading-[1.1] mb-6"
            >
              Ready to <br />
              <span className="title-highlight">
                <Typewriter
                  options={{
                    strings: ["Donate Blood", "Save Lives", "Be a Hero"],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 max-w-xl mx-auto lg:mx-0 mb-10 text-base md:text-lg font-medium leading-relaxed"
            >
              Your one drop of blood can be the reason for someone’s tomorrow. 
              Join our community of life-savers today and make a difference.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="btn bg-red-600 hover:bg-red-700 text-white px-10 h-16 rounded-2xl border-none shadow-xl shadow-red-200 font-black text-lg gap-3"
              >
                <FaUserPlus /> Join as Donor
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/search")}
                className="btn bg-white hover:bg-gray-50 text-gray-800 px-10 h-16 rounded-2xl border border-gray-200 shadow-xl font-black text-lg gap-3 transition-all"
              >
                <FaSearch className="text-red-600" /> Search Donors
              </motion.button>
            </motion.div>
          </div>

      
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-red-600 rounded-[4rem] rotate-6 scale-105 opacity-10 group-hover:rotate-12 transition-transform duration-500"></div>
              
              <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] bg-white p-4 rounded-[4rem] shadow-2xl shadow-red-500/10 border border-red-50 overflow-hidden">
                <img 
                  src="https://thalassaemia.org.cy/wp-content/uploads/2021/06/WBDD-Visual-3.png" 
                  alt="Blood Donation" 
                  className="w-full h-full object-cover rounded-[3.5rem] grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Floating Info Card */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-red-50 hidden md:flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl">
                    🩸
                  </div>
                  <div>
                    <p className="text-xl font-black text-gray-800">100% Free</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Community Platform</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;