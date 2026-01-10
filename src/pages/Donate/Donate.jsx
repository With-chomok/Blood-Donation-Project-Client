import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router"; // ১. useNavigate ইমপোর্ট করুন
import { FaArrowLeft } from "react-icons/fa"; // আইকনের জন্য

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate(); // ২. নেভিগেট হুক সেট করুন

  const handleDonate = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateName.value;

    if (!donateAmount || donateAmount <= 0) {
      return Swal.fire("Error", "Please enter a valid amount", "error");
    }

    const donerEmail = user?.email;
    const donerName = user?.displayName;

    const formData = {
      donateAmount,
      donerEmail,
      donerName,
    };

    Swal.fire({
      title: "Redirecting to Payment...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axiosInstance
      .post("/create-payment", { formData })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong with the payment", "error");
      });
  };

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res => {
          console.log("Payment saved in DB", res.data);
          Swal.fire("Success", "Thank you for your donation!", "success");
        });
    }
  }, [axiosInstance]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      {/* Back Button */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} // ৩. এটি ইউজারকে এক ধাপ পেছনে নিয়ে যাবে
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Previous Page
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-600">Support LifeDrop 💖</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Your contribution helps us save more lives and maintain our platform.
        </p>
      </div>

      {/* Custom Amount Form */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-2xl shadow-red-100 border border-red-50">
        <form onSubmit={handleDonate} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Donation Amount (USD)</span>
            </label>
            <input
              type="number"
              name="donateName"
              required
              placeholder="e.g. 10"
              className="input input-bordered border-red-200 focus:border-red-500 rounded-2xl w-full text-center text-xl font-bold"
            />
          </div>
          <button className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-2xl border-none h-14 text-lg">
            Donate Now
          </button>
        </form>
      </div>

      {/* Why Funding Info Grid */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h3 className="text-xl font-bold text-red-600 mb-2">Platform Care</h3>
          <p className="text-gray-600 text-sm">Maintains our servers and high-speed database for emergency response.</p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h3 className="text-xl font-bold text-red-600 mb-2">Campaigns</h3>
          <p className="text-gray-600 text-sm">Helps us organize blood donation camps in remote areas of the country.</p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h3 className="text-xl font-bold text-red-600 mb-2">Direct Support</h3>
          <p className="text-gray-600 text-sm">Provides logistics for emergency patients who need blood urgently.</p>
        </div>
      </div>
    </div>
  );
};

export default Donate;