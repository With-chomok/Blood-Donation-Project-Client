import { useForm } from "react-hook-form";

import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/UseAuth";

import Loading from "../../../components/Loader/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useAuth();
  console.log(user);

  const [upozillas, setUpozillas] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm();

  const AxiosSecure = useAxiosSecure();
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
  if (!user) {
    return <Loading></Loading>;
  }
  const onSubmit = (data) => {
    const donationRequest = {
      ...data,
      requesterName: user.displayName,
      requesterEmail: user.email,
      donationStatus: "pending",
    };
    console.log(data);

    AxiosSecure.post("/requests", donationRequest)
      .then((res) => {
        alert(res.data.insertedId);
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl shadow-red-500/20">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          🩸 Blood Donation Request
        </h2>

        {/* Requester Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Requester Name</label>
            <input
              value={user?.displayName || ""}
              readOnly
              className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Requester Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 bg-gray-100"
            />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="mt-4">
          <label className="font-semibold">Recipient Name</label>
          <input
            {...register("recipientName", { required: true })}
            placeholder="Recipient Name"
            className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
          />
        </div>

        {/* District & Upazila */}
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

        {/* Hospital */}
        <div className="mt-4">
          <label className="font-semibold">Hospital Name</label>
          <input
            {...register("hospitalName", { required: true })}
            placeholder="Dhaka Medical College Hospital"
            className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
          />
        </div>

        {/* Full Address */}
        <div className="mt-4">
          <label className="font-semibold">Full Address Line</label>
          <input
            {...register("address", { required: true })}
            placeholder="CK Gosh Rd, Mymensingh 2200"
            className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
          />
        </div>

        {/* Blood Group */}
        <div className="mt-4">
          <label className="font-semibold">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20">
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

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold">Donation Date</label>
            <input
              type="date"
              {...register("donationDate", { required: true })}
              className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none  shadow-lg shadow-red-500/20"
            />
          </div>

          <div>
            <label className="font-semibold">Donation Time</label>
            <input
              type="time"
              {...register("donationTime", { required: true })}
              className="input focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mt-4">
          <label className="font-semibold">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            placeholder="Explain why blood is needed..."
            className="textarea textarea-bordered  focus:border-red-500 w-full rounded-2xl outline-none shadow-lg shadow-red-500/20"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn w-full mt-6 bg-red-600 hover:bg-red-700 text-white rounded-xl">
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
