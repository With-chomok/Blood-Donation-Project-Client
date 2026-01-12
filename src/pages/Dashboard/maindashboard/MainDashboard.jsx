import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingHeart, FaBurn } from "react-icons/fa";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const updateStatus = (id, status) => {
    axiosSecure.patch(`/update/user/status/${id}`, { status }).then(() => {
      setRequests((prev) =>
        prev.map((data) =>
          data._id === id ? { ...data, donationStatus: status } : data
        )
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
          setStats((prev) => ({
            ...prev,
            totalRequest: prev.totalRequest - 1,
          }));
          Swal.fire("Deleted!", "Request has been deleted.", "success");
        });
      }
    });
  };
  const chartData = [
    { name: "Total Users", value: stats.totalUsers },
    { name: "Requests", value: stats.totalRequest },
    { name: "Funding", value: stats.totalFunding / 100 }, 
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
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
      className="space-y10 p-2  md:p-6">
      {/* Stats Cards Section with Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 transition-all">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className={`${card.bg} ${card.color} p-4 rounded-xl text-3xl`}>
              {card.icon}
            </motion.div>
            <div>
              <p className="text-gray-500 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.count}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
        <motion.div
          variants={itemVariants}
          className="bg-white p-10 rounded-2xl shadow-sm border border-gray-50 h-[350px]">
          <h3 className="text-lg font-bold mb-4">Donation Analytics (Bar)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "#fef2f2" }} />
              <Bar
                dataKey="value"
                fill="#dc2626"
                radius={[10, 10, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 h-[350px]">
          <h3 className="text-lg font-bold mb-4">Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
      {/* Recent Donation Requests Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white">
          <h3 className="text-xl font-bold text-gray-800">
            Recent Donation Requests
          </h3>
          <Link
            to="/dashboard/my-donation-requests"
            className="text-red-600 font-semibold hover:underline text-sm flex items-center gap-1 group">
            See All Requests{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
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
                    className="hover:bg-red-50/30 transition-colors border-b border-gray-50 last:border-none">
                    <td className="font-semibold text-gray-700">
                      {r.recipientName}
                    </td>
                    <td className="text-gray-600">
                      {r.district}, {r.upazila}
                    </td>
                    <td>
                      <span className="block font-medium text-gray-700">
                        {r.donationDate}
                      </span>
                      <span className="text-xs text-gray-400">
                        {r.donationTime}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-error text-white font-bold px-3 py-3 shadow-sm">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm capitalize border-none font-semibold ${
                          r.donationStatus === "done"
                            ? "bg-green-100 text-green-700"
                            : r.donationStatus === "inprogress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                        {r.donationStatus}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      {r.donationStatus === "inprogress" && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateStatus(r._id, "done")}
                            className="btn btn-xs btn-success text-white hover:scale-110 transition-transform">
                            Done
                          </button>
                          <button
                            onClick={() => updateStatus(r._id, "canceled")}
                            className="btn btn-xs btn-error text-white hover:scale-110 transition-transform">
                            Cancel
                          </button>
                        </div>
                      )}
                      <Link
                        to={`/donation-request/${r._id}`}
                        className="btn btn-xs btn-outline hover:bg-gray-800 transition-all rounded-md">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="btn btn-xs btn-ghost text-red-500 hover:bg-red-50 rounded-md">
                        Delete
                      </button>
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
