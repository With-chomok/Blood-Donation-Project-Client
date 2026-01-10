import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingHeart, FaBurn } from "react-icons/fa";
import { motion } from "framer-motion"; // ১. Framer Motion ইমপোর্ট
import Typewriter from "typewriter-effect"; // ২. Typewriter ইমপোর্ট

const MainDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequest: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/dashboard/donor-home?email=${user.email}&limit=3`)
      .then((res) => {
        setRequests(res.data.recentRequests || []);
        setStats({
          totalUsers: res.data.totalUsers || 0,
          totalFunding: res.data.totalFunding || 0,
          totalRequest: res.data.totalRequest || 0,
        });
      })
      .catch((error) => {
        console.error("Fetching Error:", error);
      });
  }, [axiosSecure, user?.email]);

  // অ্যানিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const updateStatus = (id, status) => {
    axiosSecure.patch(`/update/user/status/${id}`, { status }).then(() => {
      setRequests((prev) =>
        prev.map((data) => (data._id === id ? { ...data, donationStatus: status } : data))
      );
      Swal.fire("Updated!", `Donation is now ${status}`, "success");
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-request/${id}`).then(() => {
          setRequests((prev) => prev.filter((r) => r._id !== id));
          setStats((prev) => ({ ...prev, totalRequest: prev.totalRequest - 1 }));
          Swal.fire("Deleted!", "Request has been deleted.", "success");
        });
      }
    });
  };

  const cardData = [
    {
      id: 1,
      title: "Total Donors",
      count: stats.totalUsers,
      icon: <FaUsers />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      id: 2,
      title: "Total Funding",
      count: `$${stats.totalFunding}`,
      icon: <FaHandHoldingHeart />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      id: 3,
      title: "Donation Requests",
      count: stats.totalRequest,
      icon: <FaBurn />,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      className="space-y-8 p-2 md:p-6"
    >
      {/* Welcome Section with Typewriter */}
      <motion.div 
        variants={itemVariants}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 flex flex-wrap justify-center md:justify-start gap-2">
            Welcome back, 
            <span className="text-red-600">
              <Typewriter
                options={{
                  strings: [user?.displayName, "Life Saver", "Hero"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
            👋
          </h2>
          <p className="text-gray-500 mt-1 text-lg italic">
            "Your blood donation is a gift of life to someone in need." ❤️
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/dashboard/add-request" className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-8 shadow-lg shadow-red-200">
            Create New Request
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Cards Section with Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <motion.div 
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 transition-all"
          >
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className={`${card.bg} ${card.color} p-4 rounded-xl text-3xl`}
            >
              {card.icon}
            </motion.div>
            <div>
              <p className="text-gray-500 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Donation Requests Table */}
      <motion.div 
        variants={itemVariants}
        className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
          <h3 className="text-xl font-bold text-gray-800">Recent Donation Requests</h3>
          <Link to="/dashboard/my-donation-requests" className="text-red-600 font-semibold hover:underline text-sm flex items-center gap-1 group">
            See All Requests <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 border-none">
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={r._id} 
                    className="hover:bg-red-50/30 transition-colors border-b border-gray-50 last:border-none"
                  >
                    <td className="font-semibold text-gray-700">{r.recipientName}</td>
                    <td className="text-gray-600">{r.district}, {r.upazila}</td>
                    <td>
                      <span className="block font-medium text-gray-700">{r.donationDate}</span>
                      <span className="text-xs text-gray-400">{r.donationTime}</span>
                    </td>
                    <td><span className="badge badge-error text-white font-bold px-3 py-3 shadow-sm">{r.bloodGroup}</span></td>
                    <td>
                      <span className={`badge badge-sm capitalize border-none font-semibold ${r.donationStatus === 'done' ? 'bg-green-100 text-green-700' : r.donationStatus === 'inprogress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {r.donationStatus}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      {r.donationStatus === "inprogress" && (
                        <div className="flex gap-1">
                          <button onClick={() => updateStatus(r._id, "done")} className="btn btn-xs btn-success text-white hover:scale-110 transition-transform">Done</button>
                          <button onClick={() => updateStatus(r._id, "canceled")} className="btn btn-xs btn-error text-white hover:scale-110 transition-transform">Cancel</button>
                        </div>
                      )}
                      <Link to={`/donation-request/${r._id}`} className="btn btn-xs btn-outline hover:bg-gray-800 transition-all rounded-md">View</Link>
                      <button onClick={() => handleDelete(r._id)} className="btn btn-xs btn-ghost text-red-500 hover:bg-red-50 rounded-md">Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center text-gray-400 italic">
            No recent donation requests found. Start by creating one!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MainDashboard;