import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaUserShield, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Login() {
  const { signInUser, signInWithGoogle } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //  Demo Login Function
  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setValue("email", "admin@gmail.com");
      setValue("password", "123456789Aa@");
    } else {
      setValue("email", "dipoldaschomok@gmail.com");
      setValue("password", "123456789Aa@");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location.state || "/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate(location.state || "/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-2xl shadow-red-500/10 rounded-[2.5rem] p-8 md:p-10 border border-red-50"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Welcome <span className="text-red-600">Back!</span>
          </h2>
          <p className="text-gray-500 font-medium mt-2">Login to continue saving lives.</p>
        </div>

        {/* 🛠️ Demo Login Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => handleDemoLogin("admin")}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
          >
            <FaUserShield /> Admin Demo
          </button>
          <button
            onClick={() => handleDemoLogin("donor")}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
          >
            <FaUserEdit /> Donor Demo
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block font-bold text-gray-700 mb-2 ml-1 text-sm uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              placeholder="example@mail.com"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full rounded-2xl h-14 outline-none shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all border-gray-200"
            />
            {errors.email && <p className="text-red-500 text-xs mt-2 ml-2 font-bold">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-bold text-gray-700 mb-2 ml-1 text-sm uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered w-full rounded-2xl h-14 outline-none shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all border-gray-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-2 ml-2 font-bold">{errors.password.message}</p>}
          </div>

          <button 
            disabled={loading}
            className={`btn w-full bg-red-600 hover:bg-red-700 border-none text-white shadow-xl shadow-red-200 rounded-2xl h-14 text-lg font-black transition-all ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-200"></span>
          <span className="relative bg-white px-4 text-sm text-gray-400 font-bold uppercase tracking-widest">OR</span>
        </div>

        {/* Social Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 shadow-sm rounded-2xl h-14 font-bold gap-3 transition-all"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="text-center mt-8 text-gray-500 font-medium">
          New to LifeDrop?{" "}
          <Link to="/register" className="text-red-600 font-black hover:underline underline-offset-4">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}