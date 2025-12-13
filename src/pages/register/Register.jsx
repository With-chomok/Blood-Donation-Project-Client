import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/UseAuth";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signInWithGoogle } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUserProfile, signInUser } = useAuth();
  const onSubmit = (data) => {
    console.log("Register data:", data);
    // handle register
    console.log(data.photo[0]);
    signInUser(data.email, data.password, data.name, data.photo)
      .then((result) => {
        console.log(result.user);
        // 1. image store
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        // 2. fetch image api
        const imageKey = ` https://api.imgbb.com/1/upload?key=${
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
    <div className="min-h-screen flex items-center shadow-2xl shadow-cyan-500/20 justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
          Register Now
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="input outline-none input-bordered rounded-2xl shadow-lg shadow-cyan-500/20 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered outline-none w-full rounded-2xl shadow-lg shadow-cyan-500/20"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="label text-black">Photo</label>
            <input
              {...register("photo", { required: true })}
              type="file"
              className="file-input input-bordered outline-none w-full rounded-2xl shadow-lg shadow-cyan-500/20"
              placeholder="Choose Your Photo"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              className="input outline-none input-bordered rounded-2xl w-full shadow-lg shadow-cyan-500/20"
            />
            {errors.password ==="required" && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is wrong</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password upto 4 character</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500"> password less then 7 character</p>
            )}

            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least 1 capital letter, 1 small letter,
                1 number, 1 special character & minimum 8 characters
              </p>
            )}
          </div>

          <button className="btn  bg-cyan-600 border-none w-full text-white mt-2 shadow-lg shadow-cyan-500/30 rounded-2xl">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-600 font-semibold">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          className="btn outline-none bg-white w-full shadow-lg shadow-cyan-500/20 rounded-2xl"
          onClick={() => signInWithGoogle()}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
