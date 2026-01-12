import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserSecret, FaEyeSlash } from "react-icons/fa";

const PrivacyPolicy = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const policies = [
    {
      icon: <FaLock className="text-red-600" />,
      title: "Data Protection",
      desc: "We use high-level encryption to ensure that your personal information and blood donation records are stored securely."
    },
    {
      icon: <FaUserSecret className="text-red-600" />,
      title: "Privacy First",
      desc: "Your contact details are only shared with verified receivers in case of a direct blood request match."
    },
    {
      icon: <FaEyeSlash className="text-red-600" />,
      title: "No Third-Party Sharing",
      desc: "LifeDrop never sells or rents your personal data to any third-party marketing agencies or organizations."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* 🛡️ Header Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <FaShieldAlt /> Secure & Trusted
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Your trust is our priority. Learn how we handle your data to keep the community safe.
          </p>
        </motion.div>

        {/* ⚡ Quick Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {policies.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-red-50/50 border border-red-100 rounded-[2.5rem] text-center"
            >
              <div className="text-3xl flex justify-center mb-4">{p.icon}</div>
              <h3 className="font-black text-gray-800 mb-2">{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 📄 Detailed Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="prose prose-red max-w-none text-gray-600 space-y-10"
        >
          <section>
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-red-600 rounded-full"></span>
              Information We Collect
            </h2>
            <p className="mt-4 leading-relaxed">
              To provide our life-saving services, we collect information such as your name, blood group, contact number, and location. This helps us connect donors with those in urgent need.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-red-600 rounded-full"></span>
              How We Use Your Data
            </h2>
            <ul className="list-disc ml-6 mt-4 space-y-3 font-medium">
              <li>To facilitate blood donation requests and matches.</li>
              <li>To notify you about emergency blood needs in your area.</li>
              <li>To manage your donation history and eligibility status.</li>
              <li>To improve our platform and ensure community safety.</li>
            </ul>
          </section>

          <section className="bg-gray-900 p-10 rounded-[3rem] text-white">
            <h2 className="text-2xl font-black mb-4">Your Consent</h2>
            <p className="opacity-80 leading-relaxed italic">
              "By using LifeDrop, you agree to our terms of data handling. We promise to protect your information with the same care that you provide to the community through your donations."
            </p>
          </section>

          <section className="text-center pt-10">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Last Updated: January 2026
            </p>
            <button 
              onClick={() => window.print()} 
              className="mt-6 text-red-600 font-black hover:underline underline-offset-8"
            >
              Download PDF Version
            </button>
          </section>
        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;