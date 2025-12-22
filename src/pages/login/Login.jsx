import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";
import { useState } from "react";

export default function Login() {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signInUser(data.email, data.password);
      navigate(location.state || "/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Login to LifeDrop
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 ">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 focus:border-red-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-semibold mb-1">Password</label>
            <input
              placeholder=" Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "Password must be 8 characters, include uppercase, lowercase, number & special character",
                },
              })}
              className="input input-bordered w-full rounded-2xl pr-20 outline-none shadow-lg shadow-red-500/20 focus:border-red-500"
            />

            {/* Show / Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute -ml-13  text-sm font-semibold text-red-600 z-10 mt-2">
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-500  text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button  className="btn w-full bg-red-600 hover:bg-red-700 border-none text-white shadow-lg shadow-red-500/30 rounded-xl mt-2">
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
