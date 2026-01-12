import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaHandHoldingHeart, FaUserShield, FaNotesMedical, FaClock, FaAmbulance } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const services = [
  {
    id: 1,
    title: "Find Blood Donors",
    description: "Search for eligible blood donors near your location by blood group and district instantly.",
    icon: <FaSearch />,
    color: "bg-red-50 text-red-600",
  },
  {
    id: 2,
    title: "Emergency Request",
    description: "Post urgent blood requests to reach hundreds of donors in your area within seconds.",
    icon: <FaAmbulance />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    title: "Donor Management",
    description: "Keep track of your donation history and next eligibility date through your personal dashboard.",
    icon: <FaUserShield />,
    color: "bg-red-50 text-red-600",
  },
  {
    id: 4,
    title: "Health Guidelines",
    description: "Access expert medical tips and eligibility criteria to ensure a safe blood donation process.",
    icon: <FaNotesMedical />,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Our community and support team are always available to help you in times of emergency.",
    icon: <FaClock />,
    color: "bg-red-50 text-red-600",
  },
  {
    id: 6,
    title: "Life-Saving Community",
    description: "Join a network of thousands of heroes dedicated to saving lives through voluntary donation.",
    icon: <FaHandHoldingHeart />,
    color: "bg-red-100 text-red-600",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/*  Background Decor */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-60 -ml-36"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 📝 Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-black uppercase tracking-widest mb-4"
          >
            What We Offer
          </motion.div>
          
          <h2 className="section-title justify-center">
            Our Premium <br />
            <span className="title-highlight">
              <Typewriter
                options={{
                  strings: ["Services", "Solutions", "Support"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h2>
          <p className="section-subtitle mt-4">We provide a seamless experience to bridge the gap between donors and receivers.</p>
        </div>

        {/*  Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-red-500/5 hover:shadow-red-500/10 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner group-hover:bg-red-600 duration-100 animate-pulse group-hover:text-white`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-red-600  transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 font-medium leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;