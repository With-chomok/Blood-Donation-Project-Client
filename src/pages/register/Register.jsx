import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";
import axios from "axios";

export default function Register() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [upozillas, setUpozillas] = useState([]);
  const { updateUserProfile, createUser } = useAuth();

  const selectedDistrict = watch("district");
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
    try {
      const result = await createUser(data.email, data.password);
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imageKey = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_token
      }`;
      const imgRes = await axios.post(imageKey, formData);
      const photoURL = imgRes.data.data.url;

      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        photoURL: photoURL,
      };

      await axios.post(
        "https://projects-backend-side-11.vercel.app/users",
        userInfo
      );
      navigate("/");
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl shadow-red-500/20 rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-8">
          Register Now
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Name</label>
            <input
              placeholder="Your Full Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/10 focus:border-red-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>
            <input
              placeholder="Your Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/10 focus:border-red-500"
            />
          </div>

          {/* Photo */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full rounded-2xl shadow-lg shadow-red-500/10 focus:border-red-500 outline-none"
            />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full rounded-2xl shadow-lg shadow-red-500/10 outline-none focus:border-red-500"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">District Name</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full rounded-2xl shadow-lg shadow-red-500/10 outline-none focus:border-red-500"
            >
              <option value="">Select District</option>
              {allDistricts.map((district, index) => (
                <option key={index} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Upazila Name</label>
            <select
              {...register("upazila", { required: true })}
              className="select select-bordered w-full rounded-2xl shadow-lg shadow-red-500/10 outline-none focus:border-red-500"
            >
              <option value="">Select Upazila</option>
              {upozillas.map((u, i) => (
                <option key={i} value={typeof u === "string" ? u : u.name}>
                  {typeof u === "string" ? u : u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                })}
                className="input input-bordered w-full rounded-2xl pr-14 shadow-lg shadow-red-500/10 outline-none focus:border-red-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-red-600 z-10"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input input-bordered w-full rounded-2xl shadow-lg shadow-red-500/10 outline-none focus:border-red-500"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <button className="btn w-full bg-red-600 hover:bg-red-700 text-white  border-none rounded-2xl shadow-lg shadow-red-500/30">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}