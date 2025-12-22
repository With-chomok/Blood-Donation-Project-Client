import { useEffect, useState } from "react";
import useAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  const axiosSecure = useAxiosSecure();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name:  "",
    photoURL: "",
    district:"",
    upazila:  "",
    bloodGroup:  "",
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
      Swal.fire("Success", "Profile updated successfully", "success");
      setIsEditing(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          👤 My Profile
        </h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-outline btn-error">
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn bg-red-600 text-white">
            Save Changes
          </button>
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={formData.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
          className="w-24 h-24 object-cover rounded-full ring ring-red-500"
        />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={formData.upazila}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            disabled={!isEditing}
            onChange={handleChange}
            className="select select-bordered w-full">
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default Profile;
