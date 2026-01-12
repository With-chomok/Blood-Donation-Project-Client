import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaHeart, FaShieldAlt, FaGlobeAsia } from "react-icons/fa"; 
import { motion } from "framer-motion"; 
import Typewriter from "typewriter-effect";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDonate = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateName.value;

    if (!donateAmount || donateAmount <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid amount to support us!",
        confirmButtonColor: "#dc2626",
      });
    }

    const donerEmail = user?.email;
    const donerName = user?.displayName;

    const formData = {
      donateAmount,
      donerEmail,
      donerName,
    };

    Swal.fire({
      title: "Redirecting to Stripe...",
      text: "Please wait while we set up your secure payment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axiosInstance
      .post("/create-payment", { formData })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Could not initiate payment. Try again!", "error");
      });
  };

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res => {
          Swal.fire({
            title: "Contribution Received! 🎉",
            text: "Thank you for your generous support to LifeDrop.",
            icon: "success",
            confirmButtonColor: "#dc2626",
          });
          
          navigate("/dashboard/donate", { replace: true });
        });
    }
  }, [axiosInstance, navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl bg-red-20 mx-auto px-4 py-10 min-h-screen"
    >
      {/* Back Button with Hover Animation */}
      <motion.div 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="mb-8"
      >
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-bold transition-all group"
        >
          <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Dashboard
        </button>
      </motion.div>

      <div className="text-center mb-12">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="section-title flex flex-wrap justify-center gap-3"
        >
          Support <span className="title-highlight italic">LifeDrop</span>
          <span className="text-red-500">
            <Typewriter
              options={{
                strings: ["💖", "Community", "Mission"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </motion.h1>
        <p className="section-subtitle">
          Your small contribution plays a huge role in maintaining our emergency blood response network.
        </p>
      </div>

      {/* Main Donation Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md mx-auto relative"
      >
        {/* Decorative background element */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-400 rounded-3xl blur opacity-20"></div>
        
        <div className="relative bg-white p-10 rounded-3xl shadow-sm border border-gray-50">
          <form onSubmit={handleDonate} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-600 uppercase tracking-wider text-xs">Amount to Donate (USD)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                <input
                  type="number"
                  name="donateName"
                  required
                  placeholder="0.00"
                  className="input input-bordered border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-50 rounded-2xl w-full pl-10 h-16 text-2xl font-black text-gray-800 outline-none shadow-md shadow-red-100 transition-all"
                />
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-2xl border-none h-16 text-xl font-bold shadow-lg shadow-red-200 transition-all"
            >
              Confirm Donation
            </motion.button>
            
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Securely processed via Stripe
            </p>
          </form>
        </div>
      </motion.div>

      {/* Feature Grid with Hover Animations */}
      <div className="mt-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: <FaShieldAlt />, title: "Platform Care", desc: "Covers hosting and security costs to keep your data safe." },
          { icon: <FaGlobeAsia />, title: "Expansion", desc: "Helps us reach donors in the most remote areas of the country." },
          { icon: <FaHeart />, title: "Free Service", desc: "Ensures LifeDrop remains 100% free for patients and donors." }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1) }}
            whileHover={{ y: -10 }}
            className="group p-8 rounded-3xl border border-transparent  hover:border-red-100 transition-all duration-300  flex flex-col "
          >
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto md:mx-0">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Donate;