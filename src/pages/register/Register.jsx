import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/UseAuth";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, updateUserProfile, createUser } = useAuth();
  console.log(user);
  const onSubmit = (data) => {
    console.log("Register data:", data.name);
    // handle register
    console.log(data.photo[0]);
    createUser(data.email, data.password, data.name, data.photo)
      .then((result) => {
        console.log(result.user);
        // 1. image store
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        // 2. fetch image api
        const imageKey = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_token
        }`;

        axios
          .post(imageKey, formData)
          .then((res) => {
            console.log(res.data.data.url, "upload image success");
            
            // 3. save user info to firebase
            const displayUserInfo = {
              displayName: data.name,
              photoURL: res.data.data.url,
              
            };
            updateUserProfile(displayUserInfo)
              .then(() => {
                console.log("user profile updated");
                navigate(location.state || "/");
              })
              .catch((err) => {
                console.log(err);
              });
          })

          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl shadow-red-500/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Register Now
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block font-semibold mb-1">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 "
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block font-semibold mb-1">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="input focus:border-red-500 input-bordered w-full rounded-2xl pr-16 outline-none shadow-lg shadow-red-500/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2/3 -translate-y-1/2 text-sm font-semibold text-red-600">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit */}
          <button className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-500/30">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
