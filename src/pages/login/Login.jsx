import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
    const {signInWithGoogle} =use(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // handle login
  };

  return (
    <div className="min-h-screen flex items-center shadow-2xl shadow-cyan-500/20 justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">Login Now</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="input outline-none input-bordered rounded-2xl w-full shadow-lg shadow-cyan-500/20"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
              className="input outline-none input-bordered rounded-2xl w-full shadow-lg shadow-cyan-500/20"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button className="btn  bg-cyan-600 border-none w-full text-white mt-2 shadow-lg shadow-cyan-500/30 rounded-2xl">Login</button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-600 font-semibold">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>

        <button className="btn outline-none bg-white w-full shadow-lg shadow-cyan-500/20 rounded-2xl" onClick={()=> {signInWithGoogle()}}>Continue with Google</button>
      </div>
    </div>
  );
}
