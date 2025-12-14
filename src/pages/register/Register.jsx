import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/UseAuth";
import axios from "axios";

export default function Register() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [upozillas, setUpozillas] = useState([]);
  const {updateUserProfile, createUser } = useAuth();

  const selectedDistrict = useWatch({control, name: "district"});
  const districtCenter = useLoaderData();
  const allDistricts = districtCenter.divisions.flatMap(
    (division) => division.districts
  );
  useEffect(() => {
    if (!selectedDistrict) {
      setUpozillas([]);
      return;
    }

    const districtObj = allDistricts.find((d) => d.name === selectedDistrict);

    setUpozillas(districtObj ? districtObj.upazilas : []);
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    console.log("Register data:", data.name);
    // handle register
    console.log(data.photo[0]);
    createUser(
      data.email,
      data.password,
      data.name,
      data.photo,
      data.district,
      data.upazila
    )
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

            navigate(location.state || "/");
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

          {/* Blood Group */}
          <label className="block font-semibold mb-1">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20">
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          {/* District */}
          <label className="block font-semibold mb-1">District Name</label>
          <select
            type="text"
            {...register("district", { required: true })}
            className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20">
            <option value="district">Select District</option>
            {allDistricts.map((district, index) => (
              <option key={index} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <label className="block font-semibold mb-1">Upazila Name</label>
          <select
            type="text"
            {...register("upazila", { required: true })}
            className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20">
            <option value="">Select Upazila</option>
            {upozillas.map((u, i) => (
              <option key={i} value={typeof u === "string" ? u : u.name}>
                {typeof u === "string" ? u : u.name}
              </option>
            ))}
          </select>

          {/* Password */}
          <div className="relative">
            <label className="block font-semibold mb-1">Password</label>

            <input
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
              className="absolute right-4 -translate-y-1/2 text-sm font-semibold text-red-600 z-10 mt-5">
              {showPassword ? "Hide" : "Show"}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
