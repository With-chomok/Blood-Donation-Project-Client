import React from "react";
import { motion } from "framer-motion";
import { FaFileContract, FaCheckCircle, FaUserCheck, FaBan } from "react-icons/fa";

const TermsOfService = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const rules = [
    {
      icon: <FaUserCheck className="text-red-600" />,
      title: "User Eligibility",
      desc: "Donors must be at least 18 years old and meet the health criteria for blood donation."
    },
    {
      icon: <FaCheckCircle className="text-red-600" />,
      title: "Genuine Requests",
      desc: "All blood requests must be real. Providing false information will lead to account suspension."
    },
    {
      icon: <FaBan className="text-red-600" />,
      title: "Non-Commercial",
      desc: "Blood is a gift. Selling or buying blood through this platform is strictly prohibited."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* 📜 Header Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <FaFileContract /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Please read these terms carefully before using the LifeDrop platform.
          </p>
        </motion.div>

        {/* ⚡ Quick Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {rules.map((rule, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white border border-gray-100 shadow-xl shadow-red-500/5 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-red-200 transition-all"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{rule.icon}</div>
              <h3 className="font-black text-gray-800 mb-2">{rule.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{rule.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 📝 Detailed Sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-red-500/5 border border-gray-100 space-y-12"
        >
          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-4 border-l-4 border-red-600 pl-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using LifeDrop, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-4 border-l-4 border-red-600 pl-4">2. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              As a user of this platform, you agree to:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Provide accurate profile data", "Respect donor privacy", "Respond to requests promptly", "Maintain account security"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-4 border-l-4 border-red-600 pl-4">3. Prohibited Activities</h2>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <p className="text-red-700 font-medium leading-relaxed">
                LifeDrop is a non-profit voluntary community. Any attempt to use this platform for financial gain, harassment, or illegal activities will result in an immediate permanent ban and potential legal action.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-800 mb-4 border-l-4 border-red-600 pl-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              LifeDrop acts as a bridge between donors and receivers. We do not perform medical procedures and are not responsible for any health issues arising from donations. Always consult with a medical professional.
            </p>
          </section>

          <div className="pt-10 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">Effective Date: Jan 12, 2026</p>
            <p className="text-gray-500 text-sm">
              If you have any questions, contact us at <span className="text-red-600 font-bold">legal@lifedrop.com</span>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsOfService;