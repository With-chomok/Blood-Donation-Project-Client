import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxios from "../../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaSearch, FaTint, FaMapMarkerAlt, FaUserSlash } from "react-icons/fa";

const SearchRequest = () => {
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const axiosInstance = useAxios();
  
  const { watch, register, handleSubmit } = useForm();
  const [upozillas, setUpozillas] = useState([]);
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
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      {/* 📝 Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="section-title justify-center">
          Find A <span className="title-highlight">
            <Typewriter
              options={{
                strings: ["Blood Donor", "Hero", "Life Saver"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h2>
        <p className="section-subtitle">Search by blood group and location to find donors near you.</p>
      </motion.div>

      {/* 🏛️ Modern Search Form */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-red-100 border border-red-50 mb-16"
      >
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blood Group */}
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Blood Group</label>
              <div className="relative">
                <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <select
                  {...register("bloodGroup", { required: true })}
                  className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 pl-12 h-14 bg-gray-50 border-none"
                >
                  <option value="">Select Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">District Name</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <select
                  {...register("district", { required: true })}
                  className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 pl-12 h-14 bg-gray-50 border-none"
                >
                  <option value="district">Select District</option>
                  {allDistricts.map((district, index) => (
                    <option key={index} value={district.name}>{district.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upazila */}
            <div className="form-control">
              <label className="label font-bold text-gray-700 ml-1">Upazila Name</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                <select
                  {...register("upazila", { required: true })}
                  className="select select-bordered focus:border-red-500 input-bordered w-full rounded-2xl outline-none shadow-lg shadow-red-500/20 pl-12 h-14 bg-gray-50 border-none"
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

          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn bg-red-600 hover:bg-red-700 text-white px-12 h-14 rounded-2xl border-none shadow-xl shadow-red-200 font-bold text-lg gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <><FaSearch /> Search Donors</>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* 🔍 Search Results Area */}
      <AnimatePresence>
        {searched && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {donors.length === 0 ? (
              <div className="text-center p-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <FaUserSlash className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400">No donor found for this search</h3>
                <p className="text-gray-400">Try changing the location or blood group.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {donors.map((donor, index) => (
                  <motion.div
                    key={donor._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group bg-white p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-red-100 transition-all border border-gray-100 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-all group-hover:scale-150"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="avatar mb-4">
                        <div className="w-24 h-24 rounded-3xl ring-4 ring-red-50 ring-offset-4 overflow-hidden">
                          <img src={donor.photoURL || "https://i.ibb.co/2kR5zq0/user.png"} alt="donor" />
                        </div>
                      </div>

                      <h3 className="font-black text-xl text-gray-800 mb-1">{donor.name}</h3>
                      
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full font-bold text-sm mb-4">
                        <FaTint /> {donor.bloodGroup}
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                        <FaMapMarkerAlt className="text-red-400" />
                        {donor.district}, {donor.upazila}
                      </div>

                      <button className="mt-6 w-full py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-red-600 transition-colors shadow-lg">
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchRequest;