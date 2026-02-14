import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Link } from "react-router";

const MyRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequests, setMyRequests] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        console.log(res.data);
        setMyRequests(res.data.result);
        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  // filter logic
  const filteredRequests =
    filter === "all"
      ? myRequests
      : myRequests.filter((req) => req.donationStatus === filter);

  // pagination logic
  const totalPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((e) => e + 1);
  //   const startIndex = (currentPage - 1) * itemsPerPage;

  console.log(myRequests, filteredRequests);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 my-10">
      {/* Header */}
      <div className="md:flex justify-between items-center mb-4">
        <motion.div className="mb-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/dashboard/add-request"
            className="btn hover:bg-red-700 text-black border border-gray-300 rounded-md px-8  shadow-red-200">
            Create New Request
          </Link>
        </motion.div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered outline-none focus:border-red-500">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-red-100 text-red-700">
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>{req.address}</td>
                <td>
                  <span className="badge badge-outline text-red-600">
                    {req.bloodGroup}
                  </span>
                </td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>
                  <span
                    className={`badge capitalize ${
                      req.donationStatus === "pending" && "badge-warning"
                    } ${req.donationStatus === "inprogress" && "badge-info"} ${
                      req.donationStatus === "done" && "badge-success"
                    } ${req.donationStatus === "canceled" && "badge-error"}`}>
                    {req.donationStatus}
                  </span>
                </td>
              </tr>
            ))}
            {myRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No donation requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={handlePrev}
            className="btn btn-sm btn-outline text-red-600">
            Prev
          </button>
          {pages.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`btn btn-sm ${
                num === currentPage
                  ? "bg-red-600 text-white"
                  : "btn-outline text-red-600"
              }`}>
              {num}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="btn btn-sm btn-outline text-red-600">
            Next
          </button>
        </div>
      }
    </div>
  );
};

export default MyRequest;
