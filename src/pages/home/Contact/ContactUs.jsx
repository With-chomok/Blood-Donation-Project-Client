import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <section className="py-20  overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header with Typewriter */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-800 flex flex-wrap justify-center gap-3"
          >
            Get In <span className="text-red-600">
              <Typewriter
                options={{
                  strings: ["Touch", "Contact", "Connect"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </motion.h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Have questions? We are always ready to help you with your emergency blood donation needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Phone</p>
                <p className="text-lg font-bold text-gray-800">+880-1798571413</p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Email</p>
                <p className="text-lg font-bold text-gray-800">support@lifedrop.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Location</p>
                <p className="text-lg font-bold text-gray-800">Dhaka, Bangladesh</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-red-100/50 border border-red-50"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-red-500 bg-gray-50 border-gray-200 h-14 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full rounded-2xl focus:outline-none focus:border-red-500 bg-gray-50 border-gray-200 h-14 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-1">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  className="textarea textarea-bordered w-full rounded-2xl focus:outline-none focus:border-red-500 bg-gray-50 border-gray-200 h-32 transition-all"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-2xl border-none h-14 text-lg font-bold gap-2 shadow-lg shadow-red-200"
              >
                Send Message <FaPaperPlane className="text-sm" />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;