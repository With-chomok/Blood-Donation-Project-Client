import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/UseAuth";
import Loading from "../../../components/Loader/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaPlusCircle, FaTint, FaUserAlt, FaMapMarkerAlt, FaHospital, FaCalendarAlt, FaClock, FaAlignLeft, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const AddRequest = () => {
  const { user } = useAuth();
  const [upozillas, setUpozillas] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm();
  const AxiosSecure = useAxiosSecure();
  const selectedDistrict = watch("district");
  const districtCenter = useLoaderData();

  const allDistricts = districtCenter.divisions.flatMap(
    (division) => division.districts
  );

  useEffect(() => {
    if (!selectedDistrict || selectedDistrict === "district") {
      setUpozillas([]);
      return;
    }
    const districtObj = allDistricts.find((d) => d.name === selectedDistrict);
    setUpozillas(districtObj ? districtObj.upazilas : []);
  }, [selectedDistrict]);

  if (!user) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    const donationRequest = {
      ...data,
      requesterName: user.displayName,
      requesterEmail: user.email,
      donationStatus: "pending",
    };

    AxiosSecure.post("/requests", donationRequest)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Blood donation request posted successfully",
            icon: "success",
            confirmButtonColor: "#dc2626",
          });
          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-10 px-4"
    >
      {/* 📝 Header Section */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="section-title font-black text-gray-800 flex flex-wrap justify-center lg:justify-start gap-3">
          Post a <span className="title-highlight">
            <Typewriter
              options={{
                strings: ["Blood Request", "Emergency Call", "Life-Saving Task"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h1>
        <p className="section-subtitle">Please fill out all the fields accurately to find help quickly.</p>
      </div>

      <motion.div 
        whileHover={{ shadow: "0 25px 50px -12px rgba(220, 38, 38, 0.1)" }}
        className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl shadow-red-100 border border-red-50"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Requester Info (Read Only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Requester Name</label>
              <div className="relative">
                <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  value={user?.displayName || ""}
                  readOnly
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Requester Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  value={user?.email || ""}
                  readOnly
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>
          </div>

          {/*  Recipient Name & Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Recipient Name</label>
              <div className="relative">
                <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  {...register("recipientName", { required: true })}
                  placeholder="Recipient Name"
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Blood Group</label>
              <div className="relative">
                <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <select 
                  {...register("bloodGroup", { required: true })}
                  className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 pl-12 h-14 bg-gray-100 border-none appearance-none"
                >
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

          {/*  District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">District Name</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <select 
                  {...register("district", { required: true })}
                  className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 pl-12 h-14 bg-gray-100 border-none"
                >
                  <option value="district">Select District</option>
                  {allDistricts.map((district, index) => (
                    <option key={index} value={district.name}>{district.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Upazila Name</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <select 
                  {...register("upazila", { required: true })}
                  className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 pl-12 h-14 bg-gray-100 border-none"
                >
                  <option value="">Select Upazila</option>
                  {upozillas.map((u, i) => (
                    <option key={i} value={typeof u === "string" ? u : u.name}>
                      {typeof u === "string" ? u : u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/*  Hospital & Full Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Hospital Name</label>
              <div className="relative">
                <FaHospital className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  {...register("hospitalName", { required: true })}
                  placeholder="Hospital Name"
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Full Address Line</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  {...register("address", { required: true })}
                  placeholder="Full Address"
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>
          </div>

          {/*  Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Donation Date</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  type="date"
                  {...register("donationDate", { required: true })}
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Donation Time</label>
              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <input
                  type="time"
                  {...register("donationTime", { required: true })}
                  className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 h-14 border-none"
                />
              </div>
            </div>
          </div>

          {/*  Message Area */}
          <div className="form-control">
            <label className="label font-bold text-gray-700 ml-1">Request Message</label>
            <div className="relative">
              <FaAlignLeft className="absolute left-4 top-6 text-red-500 z-10" />
              <textarea
                {...register("requestMessage", { required: true })}
                placeholder="Explain why blood is needed..."
                className="textarea textarea-bordered focus:border-red-500 w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100 pl-12 pt-5 border-none h-32 text-base"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-2xl border-none h-10 text-[18px] font-semibold gap-3 shadow-xl shadow-red-200 mt-3"
          >
            <FaPlusCircle /> Request Blood
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddRequest;