import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Aside from "../Asidebar/Aside"; 
import useAuth from "../hooks/UseAuth";
import Typewriter from "typewriter-effect";
import ThemeToggle from "../components/Theme/ThemeToggle";
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
const { user } = useAuth();
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="flex  min-h-screen relative font-sans">
      
      {/* 📱 Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          ></motion.div>
        )}
      </AnimatePresence>

      {/* (Desktop & Mobile combined logic) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out w-72  border-r border-gray-100 shadow-2xl lg:shadow-none flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header / Logo */}
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <Link to="/" className="lg:hidden flex items-center gap-2">
            
            <h2 className="text-2xl font-black text-gray-800 tracking-tighter">
            🩸  Life<span className="text-red-600">Drop</span>
            </h2>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Navigation Links  */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <Aside closeMobileMenu={() => setIsSidebarOpen(false)} />
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-50 ">
          <p className="text-xs text-center text-base-content/50 font-medium tracking-widest uppercase">
            © 2026 LifeDrop System
          </p>
        </div>
      </aside>

      {/*  Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/*  Mobile Top Header */}
        <header className="lg:hidden  backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-700 hover:text-red-600 active:scale-90 transition-all"
            >
              <HiMenuAlt1 size={26} />
            </button>
            <h2 className="text-xl font-bold text-base-content">Dashboard</h2>
            <ThemeToggle></ThemeToggle>
          </div>
          
             <img className="flex items-center justify-center border border-red-500  text-red-600 w-10 h-10 rounded-full object-cover" src={user.photoURL} alt="" />
          
        </header>

        {/*  Main Scrollable Area */}
        <main className="flex-1 p-5 md:p-8 lg:p-12 overflow-y-auto">
          {/* Page Heading for context */}
          <div className="mb-8 hidden lg:block">
          <motion.div
              variants={itemVariants}
              className=" p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-base-content flex flex-wrap justify-center md:justify-start gap-2">
                  Welcome back,
                  <span className="text-red-600">
                    <Typewriter
                      options={{
                        strings: [user?.displayName, "Life Saver", "Hero"],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span>
                  👋
                </h2>
                <p className="text-base-content/70 mt-1 text-lg italic">
                  "Your blood donation is a gift of life to someone in need." ❤️
                </p>
              </div>
            
            </motion.div>
          </div>

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;