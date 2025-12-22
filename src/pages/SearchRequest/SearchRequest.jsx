import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useLoaderData } from "react-router";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";

const SearchRequest = () => {

  const [loading, setLoading ] =useState(false)
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
 const axiosInstance = useAxios()
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const navigate = useNavigate();
  const [upozillas, setUpozillas] = useState([]);
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

  const handleSearch = async (data) => {
  setLoading(true);
  try {
    const res = await axiosInstance.get(
      `/search-requests?bloodGroup=${data.bloodGroup}&district=${data.district}&upazila=${data.upazila}`
    );

    setDonors(res.data);
    setSearched(true);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">
          🔍 Search Blood Donors
        </h2>
        <p className="text-gray-600 mt-2">
          Find available donors by blood group and location
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit(handleSearch)}
        className="bg-white shadow-lg rounded-xl p-6 mb-10">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Blood Group */}
          <div>
            <label className="block font-semibold mb-1">Blood Group</label>
            <select
              {...register("bloodGroup", { required: true })}
              className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20">
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
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
          </div>

          {/* Upazila */}
          <div>
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
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="btn text-amber-50 bg-red-600 px-10"
            disabled={loading}>
            {loading ? "Searching..." : "🔍 Search"}
          </button>
        </div>
      </form>

      {/* Search Result */}
      {searched && (
        <>
          {donors.length === 0 ? (
            <p className="text-center text-gray-500">
              ❌ No donor found for this search
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 ">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="card bg-white shadow-lg shadow-red-500/20 rounded-xl">
                  <div className="card-body text-center">
                    <div className="avatar mx-auto mb-3">
                      <div className="w-20 rounded-full ring ring-red-500 ring-offset-2">
                        <img
                          src={
                            donor.photoURL || "https://i.ibb.co/2kR5zq0/user.png"
                          }
                          alt="donor"
                        />
                      </div>
                    </div>

                    <h3 className="font-bold text-lg">{donor.name}</h3>

                    <p className="text-red-600 font-semibold">
                      🩸 {donor.bloodGroup}
                    </p>

                    <p className="text-gray-600">
                      📍 {donor.district}, {donor.upazila}
                    </p>

                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchRequest;
