import { useEffect, useState } from "react";

import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);

  console.log(requests);
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/dashboard/donor-home?email=${user.email}&limit=3`)
      .then((res) => {
        setRequests(res.data.recentRequests);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosSecure, user?.email]);

  const updateStatus = (id, status) => {
    axiosSecure.patch(`/update/user/status/${id}`, { status }).then(() => {
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-request/${id}`).then(() => {
          setRequests((prev) => prev.filter((r) => r._id !== id));
        });
      }
    });
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-red-100 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          Welcome back, {user?.displayName} 👋
        </h2>
        <p className="text-gray-600">Thanks for being a life saver ❤️</p>
      </div>
      <h2 className="text-lg font-semibold">Total Requests: {totalRequest}</h2>

      {/* Recent Requests */}
      {requests.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-600">
            🩸 Recent Donation Requests
          </h3>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-red-50">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td>{r.recipientName}</td>
                    <td>
                      {r.district}, {r.upazila}
                    </td>
                    <td>{r.donationDate}</td>
                    <td>{r.donationTime}</td>
                    <td>{r.bloodGroup}</td>

                    <td>
                      <span className="badge badge-outline capitalize">
                        {r.status}
                      </span>
                    </td>

                    <td>
                      {r.status === "inprogress" ? (
                        <div>
                          <p>{r.donorName}</p>
                          <p className="text-sm text-gray-500">
                            {r.donorEmail}
                          </p>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="space-x-1">
                      {r.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => updateStatus(r._id, "done")}
                            className="btn btn-xs btn-success">
                            Done
                          </button>
                          <button
                            onClick={() => updateStatus(r._id, "canceled")}
                            className="btn btn-xs btn-error">
                            Cancel
                          </button>
                        </>
                      )}

                      <Link
                        to={`/dashboard/edit-request/${r._id}`}
                        className="btn btn-xs">
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(r._id)}
                        className="btn btn-xs btn-outline btn-error">
                        Delete
                      </button>

                      <Link
                        to={`/donation-request/${r._id}`}
                        className="btn btn-xs btn-outline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All */}
          <div className="text-right mt-4">
            <Link
              to="/dashboard/my-donation-requests"
              className="btn btn-sm btn-outline btn-error">
              View My All Requests →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
