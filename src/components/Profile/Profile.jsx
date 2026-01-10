import { useEffect, useState } from "react";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion"; // এনিমেশনের জন্য
import { FaEdit, FaSave, FaUserCircle, FaTint, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setFormData({
            name: res.data.name || user.displayName || "",
            photoURL: res.data.photoURL || user.photoURL || "",
            district: res.data.district || "",
            upazila: res.data.upazila || "",
            bloodGroup: res.data.bloodGroup || "",
          });
        })
        .catch((err) => console.log(err));
    }
  }, [axiosSecure, user.displayName, user.email, user.photoURL]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axiosSecure.patch(`/profile/${user.email}`, formData);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your information has been saved successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
      console.log(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Banner Decor */}
        <div className="h-32 bg-gradient-to-r from-red-500 to-red-700"></div>

        <div className="px-8 pb-8">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={formData.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg bg-white"
                alt="Profile"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </motion.div>

            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="btn bg-white border-red-500 text-red-600 hover:bg-red-50 gap-2 rounded-xl shadow-sm"
              >
                <FaEdit /> Edit Profile
              </motion.button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost text-gray-500"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="btn bg-red-600 hover:bg-red-700 text-white gap-2 rounded-xl shadow-md border-none"
                >
                  <FaSave /> Save Changes
                </motion.button>
              </div>
            )}
          </div>

          {/* User Info Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{formData.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <hr className="mb-8 border-gray-100" />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <FaUserCircle className="text-red-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled={!isEditing}
                onChange={handleChange}
                className={`input input-bordered w-full transition-all duration-300 ${
                  isEditing ? "focus:ring-2 focus:ring-red-200 border-red-200" : "bg-gray-50 opacity-80"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <FaTint className="text-red-500" /> Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                disabled={!isEditing}
                onChange={handleChange}
                className={`select select-bordered w-full transition-all ${
                  isEditing ? "focus:ring-2 focus:ring-red-200 border-red-200" : "bg-gray-50 opacity-80"
                }`}
              >
                <option value="">Select Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" /> District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                disabled={!isEditing}
                onChange={handleChange}
                className={`input input-bordered w-full transition-all ${
                  isEditing ? "focus:ring-2 focus:ring-red-200 border-red-200" : "bg-gray-50 opacity-80"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-400" /> Upazila
              </label>
              <input
                type="text"
                name="upazila"
                value={formData.upazila}
                disabled={!isEditing}
                onChange={handleChange}
                className={`input input-bordered w-full transition-all ${
                  isEditing ? "focus:ring-2 focus:ring-red-200 border-red-200" : "bg-gray-50 opacity-80"
                }`}
              />
            </div>

            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 space-y-2"
              >
                <label className="text-sm font-semibold text-gray-600">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="Paste image link here"
                  className="input input-bordered w-full border-red-200 focus:ring-2 focus:ring-red-200"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;