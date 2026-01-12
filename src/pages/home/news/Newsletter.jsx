import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";
import Swal from "sweetalert2";
import Typewriter from "typewriter-effect";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Successfully Subscribed!",
      text: "Thank you for staying with LifeDrop.",
      icon: "success",
      confirmButtonColor: "#dc2626",
      background: "#fff",
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl px-10 py-3'
      }
    });
    e.target.reset();
  };

  return (
    <section className="py-24 mx-5 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-red-50 to-white rounded-[4rem] p-10 md:p-20 border border-red-100 shadow-2xl shadow-red-100/50 overflow-hidden mx-10"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-200/20 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-300/10 rounded-full -ml-30 -mb-30 blur-2xl"></div>

          <div className="relative z-10 grid lg:grid-cols-2 items-center  gap-16">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-black uppercase tracking-widest mb-6"
              >
                <FaEnvelopeOpenText /> Newsletter
              </motion.div>
              
              <h2 className="section-title justify-center lg:justify-start leading-tight mb-6">
                Stay Informed, <br /> 
                <span className="title-highlight">
                  <Typewriter
                    options={{
                      strings: ["Save Lives ❤️", "Join Us Today", "Be a Hero"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span> 
              </h2>
              <p className="section-subtitle max-w-md mx-auto lg:mx-0">
                Subscribe to our newsletter for emergency blood alerts, health tips, and community stories.
              </p>
            </div>

            {/* Right Form */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubscribe} className="relative group">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-full">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="input focus:border-red-500 input-bordered w-full rounded-2xl h-16 outline-none shadow-lg shadow-red-500/20 bg-white border-none px-8 text-lg font-medium transition-all"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn bg-red-600 hover:bg-red-700 text-white px-10 h-16 rounded-2xl border-none shadow-xl shadow-red-300 font-black text-lg gap-3 w-full sm:w-auto transition-all"
                  >
                    Join <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.button>
                </div>
                
                <p className="text-xs mt-6 text-gray-400 font-bold flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;