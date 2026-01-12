import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "The Importance of Regular Blood Donation",
    excerpt: "Discover how your regular blood donation can improve your health and save countless lives in your community.",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQF5JnUXAhXerw/profile-displayphoto-scale_200_200/B4EZnvwYuuHoAY-/0/1760664065419?e=2147483647&v=beta&t=iB7Adpc1EVzYC9KjLrS9SYML9mvYuUnJbKBWh6hXnjc",
    author: "Dr. Sarah Kabir",
    date: "Jan 10, 2026",
    category: "Health Tips"
  },
  {
    id: 2,
    title: "Preparing for Your First Donation",
    excerpt: "Nervous about your first time? Here is a complete guide on what to eat, drink, and expect during the process.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEUjO-GtCVY8Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710859486226?e=2147483647&v=beta&t=PfjI4b1YVjow3FhCz8rNkFJF6cG0m1apf7WFhWo1924",
    author: "Admin",
    date: "Jan 05, 2026",
    category: "Guide"
  },
  {
    id: 3,
    title: "Rare Blood Groups: What You Need to Know",
    excerpt: "Learn about the rarest blood types globally and why donors with these types are so crucial for emergency cases.",
    image: "https://www.eurojuris.fr/medias/org-224/annuaire/pousset-bougere-alban.jpg",
    author: "Karim Ahmed",
    date: "Dec 28, 2025",
    category: "Education"
  }
];

const Blogs = () => {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 mx-3  md:mx-10">
          <div className="max-w-xl text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Latest from <span className="title-highlight">
                <Typewriter
                  options={{
                    strings: ["Our Blogs", "LifeDrop News", "Health Tips"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </motion.h2>
            <p className="section-subtitle">Stay updated with the latest news, stories, and health advice from our medical experts.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 rounded-2xl px-8"
          >
            View All Posts
          </motion.button>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10, 
                backgroundColor: "white",
                boxShadow: "0px 20px 40px rgba(0,0,0,0.05)" 
              }}
              className="group rounded-3xl border border-transparent hover:border-red-100 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-110 "
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-red-400" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-400" />
                    <span>{blog.date}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                <motion.button 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-red-600 font-extrabold uppercase tracking-widest text-sm"
                >
                  Read Full Story <FaArrowRight />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;