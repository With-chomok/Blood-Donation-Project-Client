import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const testimonials = [
  {
    id: 1,
    name: "Arif Rahman",
    role: "Blood Receiver",
    image: "https://i.pravatar.cc/150?u=arif",
    text: "LifeDrop saved my father's life. Within 15 minutes of posting a request, I found a donor nearby. The process was incredibly smooth and fast!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sumaiya Akter",
    role: "Regular Donor",
    image: "https://i.pravatar.cc/150?u=sumaiya",
    text: "As a donor, I love how organized this platform is. The dashboard makes it easy to track my donations and see the impact I'm making.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Kamrul Hasan",
    role: "Medical Consultant",
    image: "https://i.pravatar.cc/150?u=kamrul",
    text: "This is the most reliable blood management system I have ever seen. It bridges the gap between donors and patients perfectly.",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/*  Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-black uppercase tracking-widest mb-4"
          >
            <FaStar className="animate-pulse" /> Success Stories
          </motion.div>
          
          <h2 className="section-title justify-center">
            What People Say <br /> 
            <span className="title-highlight ml-2">
              <Typewriter
                options={{
                  strings: ["About LifeDrop", "Our Community", "Their Experiences"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h2>
          <p className="section-subtitle mt-4">Real stories from real heroes who saved or received the gift of life.</p>
        </div>

        {/*  Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl shadow-red-500/10 hover:border hover:border-red-100 relative group "
            >
              {/*  Glassmorphism Quote Icon */}
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-red-200 group-hover:rotate-12 transition-transform">
                <FaQuoteLeft />
              </div>

              {/*  Ratings */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400 text-sm" />
                ))}
              </div>

              {/*  Content */}
              <p className="text-gray-600 font-medium italic leading-relaxed mb-8">
                "{item.text}"
              </p>

              {/*  User Info */}
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-2xl ring-4 ring-red-50 ring-offset-2 overflow-hidden">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-gray-800 tracking-tight">{item.name}</h4>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-[3rem]"></div>
            </motion.div>
          ))}
        </div>

        {/* 📊 Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-100">
            Share Your Story
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonial;