import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "Who can donate blood on LifeDrop?",
    answer: "Anyone aged between 18-60 years, weighing over 50kg, and in good health can register as a donor. Our doctors verify each profile for safety."
  },
  {
    question: "How often can I donate blood?",
    answer: "You can safely donate whole blood every 3 to 4 months (90-120 days). This gives your body enough time to replenish its red blood cells."
  },
  {
    question: "Is there any cost to find blood?",
    answer: "No, LifeDrop is a 100% free platform. We do not charge any money from patients or donors. It is a community service to save lives."
  },
  {
    question: "How do I respond to an emergency request?",
    answer: "Simply log in to your dashboard, browse the 'Recent Requests' section, and click on 'View Details' to get the contact info and location."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            Common <span className="text-red-600">Questions</span>
          </h2>
          <div className="h-1.5 w-20 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 md:p-8 flex justify-between items-center text-left transition-colors hover:bg-red-50/30"
              >
                <span className="text-lg font-bold text-gray-800">{faq.question}</span>
                <div className={`p-2 rounded-full ${activeIndex === index ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'} transition-all`}>
                  {activeIndex === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;