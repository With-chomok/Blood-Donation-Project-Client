import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion"; // অ্যানিমেশনের জন্য
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.status === filter);

  // 🔴 Status Update Handler
  const updateStatus = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setUsers((prev) =>
            prev.map((user) => (user.email === email ? { ...user, status } : user))
          );
          Swal.fire("Success", `User is now ${status}`, "success");
        }
      });
  };

  // 🔴 Role Update Handler (Added Logic)
  const updateRole = (email, role) => {
    axiosSecure
      .patch(`/update/user/role?email=${email}&role=${role}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setUsers((prev) =>
            prev.map((user) => (user.email === email ? { ...user, role } : user))
          );
          Swal.fire("Success", `User role updated to ${role}`, "success");
        }
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100"
    >
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            👤 All <span className="text-red-600">Users</span>
          </h2>
          <p className="text-gray-500 text-sm">Manage user roles and account statuses</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-600">Filter by:</span>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered border-red-200 focus:outline-none focus:border-red-500 rounded-xl"
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-50">
        <table className="table w-full">
          <thead className="bg-red-50 text-red-700 uppercase text-xs">
            <tr>
              <th className="py-4">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={user._id} 
                  className="hover:bg-red-50/40 transition-colors border-b border-gray-50 last:border-none"
                >
                  {/* User Info */}
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-12 h-12 rounded-full ring ring-red-100 ring-offset-2 overflow-hidden"
                        >
                          <img src={user.photoURL} alt={user.name} />
                        </motion.div>
                      </div>
                      <div className="font-bold text-gray-800">{user.name}</div>
                    </div>
                  </td>

                  <td className="text-gray-600 italic text-sm">{user.email}</td>

                  {/* Role Badge */}
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'volunteer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <div className={`badge badge-md border-none font-semibold ${
                      user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </div>
                  </td>

                  {/* Action Dropdown */}
                  <td className="text-center">
                    <div className="dropdown dropdown-left">
                      <motion.label 
                        whileTap={{ scale: 0.9 }}
                        tabIndex={0} 
                        className="btn btn-sm btn-ghost hover:bg-red-100 text-gray-500 rounded-full"
                      >
                        <BsThreeDotsVertical size={18} />
                      </motion.label>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-2xl w-52 z-50 border border-gray-100"
                      >
                        <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Account Status</div>
                        {user.status === "active" ? (
                          <li>
                            <button onClick={() => updateStatus(user?.email, "blocked")} className="text-red-600 hover:bg-red-50 font-semibold">
                              🚫 Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button onClick={() => updateStatus(user?.email, "active")} className="text-green-600 hover:bg-green-50 font-semibold">
                              ✅ Unblock User
                            </button>
                          </li>
                        )}

                        <div className="divider my-1"></div>
                        <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Change Role</div>
                        
                        {user.role !== "volunteer" && (
                          <li>
                            <button onClick={() => updateRole(user.email, "volunteer")} className="hover:bg-blue-50 text-blue-600 font-medium">
                              🛠️ Make Volunteer
                            </button>
                          </li>
                        )}

                        {user.role !== "admin" && (
                          <li>
                            <button onClick={() => updateRole(user.email, "admin")} className="hover:bg-purple-50 text-purple-600 font-medium">
                              👑 Make Admin
                            </button>
                          </li>
                        )}
                        
                        {user.role !== "donor" && (
                           <li>
                           <button onClick={() => updateRole(user.email, "donor")} className="hover:bg-gray-50 text-gray-600 font-medium">
                             🩸 Demote to Donor
                           </button>
                         </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-b-2xl">
          <p className="text-gray-400 italic text-lg font-medium">No users found in this category.</p>
        </div>
      )}
    </motion.div>
  );
};

export default AllUsers;