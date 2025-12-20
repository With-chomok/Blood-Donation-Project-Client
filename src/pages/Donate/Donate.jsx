import React from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/UseAuth";
import { Navigate, useNavigate } from "react-router";


const Donate = () => {
  const navigate = useNavigate()
  const axiosInstance = useAxios();
  const {user} = useAuth()
console.log(user);
  const handleDonate = (e)=>{
    e.preventDefault();
    const donateAmount = e.target.donateName.value;
    const donerEmail = user?.email;
    const donerName = user?.displayName

    const formData = {
      donateAmount,
      donerEmail,
      donerName
    }
    axiosInstance.post('/create-payment', {formData})
    .then(res => {
      console.log(res.data);
      navigate(res.data.url)
    })



  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-red-600">
        Support LifeDrop 💖
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Your contribution helps us save more lives
      </p>

      {/* Funding Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[100, 300, 500].map((amount) => (
          <div
            key={amount}
            className="border border-red-600 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold">৳{amount}</h2>
            <p className="text-gray-500 mt-2">One time donation</p>
            <button className="btn hover:bg-red-600 hover:text-white border-red-600 focus:outline-none mt-4">
              Donate Now
            </button>
          </div>
        ))}
      </div>

      {/* Custom Amount */}
      <div>

      <form onSubmit={handleDonate} className="mt-10 text-center">
        <input
          type="number"
          name="donateName"
          placeholder="Enter custom amount"
          className="input input-bordered border-red-500 w-full max-w-xs"
        />
        <button className="btn bg-red-600 text-white ml-2 mt-3 md:mt-0">
          Donate
        </button>
      </form>
      </div>

      {/* Why Funding */}
      <div className="mt-16 bg-red-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-red-600">
          Why your support matters?
        </h3>
        <ul className="list-disc ml-6 mt-3 text-gray-700">
          <li>Maintain platform servers</li>
          <li>Organize blood donation campaigns</li>
          <li>Support emergency patients</li>
        </ul>
      </div>
    </div>
  );
};

export default Donate;
