import { FaTint, FaUsers, FaClock, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion"; // অ্যানিমেশনের জন্য
import Typewriter from "typewriter-effect"; // টাইপরাইটারের জন্য

const features = [
  {
    icon: <FaTint />,
    title: "Emergency Requests",
    desc: "Post and respond to urgent blood donation needs instantly.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: <FaUsers />,
    title: "Verified Donors",
    desc: "All donors are verified for safety and reliability through our system.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaClock />,
    title: "Quick Response",
    desc: "Our platform ensures the fastest connection between donor and recipient.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaHeart />,
    title: "Save Lives",
    desc: "Every single drop counts. Your contribution can save a life today.",
    color: "bg-rose-100 text-rose-600",
  },
];

const Featured = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Animated Title with Typewriter */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title justify-center "
          >
            Why Choose <span className="title-highlight">
              <Typewriter
                options={{
                  strings: ["LifeDrop?", "Saving Lives?", "Us?"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </motion.h2>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "80px" }}
             className="h-1.5 bg-red-600 mx-auto mt-4 rounded-full"
          ></motion.div>
        </div>

        {/* Features Grid with Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-10">
          {features.map((item, index) => (
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
              className="group p-8 rounded-3xl border border-transparent hover:border-red-100 transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Icon Container */}
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 ${item.color} rounded-2xl flex justify-center items-center text-3xl mb-6 shadow-sm duration-100 animate-pulse group-hover:shadow-md transition-all`}
              >
                {item.icon}
              </motion.div>

              <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative line on hover */}
              <div className="w-0 group-hover:w-12 h-1 bg-red-600 mt-6 transition-all duration-300 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;