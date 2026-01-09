import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingHeart, FaBurn } from "react-icons/fa";

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
        console.log(res.data);
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
          setStats(prev => ({...prev, totalRequest: prev.totalRequest - 1}));
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-red-600">{user?.displayName}</span>! 👋
          </h2>
          <p className="text-gray-500 mt-1 text-lg">
            Ready to save some lives today? You are doing a great job! ❤️
          </p>
        </div>
        <Link to="/dashboard/add-request" className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-xl">
          Create New Request
        </Link>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
            <div className={`${card.bg} ${card.color} p-4 rounded-xl text-3xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donation Requests Table */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Recent Donation Requests</h3>
          <Link to="/dashboard/my-donation-requests" className="text-red-600 font-semibold hover:underline text-sm">
            See All Requests
          </Link>
        </div>

        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr className="text-gray-600">
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="font-semibold">{r.recipientName}</td>
                    <td>{r.district}, {r.upazila}</td>
                    <td>
                      <span className="block font-medium">{r.donationDate}</span>
                      <span className="text-xs text-gray-400">{r.donationTime}</span>
                    </td>
                    <td><span className="badge badge-error text-white font-bold">{r.bloodGroup}</span></td>
                    <td>
                      <span className={`badge badge-sm capitalize ${r.donationStatus === 'done' ? 'badge-success' : r.donationStatus === 'inprogress' ? 'badge-info' : 'badge-ghost'}`}>
                        {r.donationStatus}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      {r.donationStatus === "inprogress" && (
                        <>
                          <button onClick={() => updateStatus(r._id, "done")} className="btn btn-xs btn-success text-white">Done</button>
                          <button onClick={() => updateStatus(r._id, "canceled")} className="btn btn-xs btn-error text-white">Cancel</button>
                        </>
                      )}
                      <Link to={`/donation-request/${r._id}`} className="btn btn-xs btn-outline">View</Link>
                      <button onClick={() => handleDelete(r._id)} className="btn btn-xs btn-ghost text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-400">
            No recent donation requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;