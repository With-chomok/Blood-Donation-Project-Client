import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { BsThreeDotsVertical } from "react-icons/bs";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);


  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.status === filter);

  // 🔴 Action handlers (API call later)
  const updateStatus = (email, status) => {
  axiosSecure
    .patch(`/update/user/status?email=${email}&status=${status}`)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        const updatedUsers = users.map((user) =>
          user.email === email ? { ...user, status } : user
        );
        setUsers(updatedUsers);
      }
    });
};


  const updateRole = (id, role) => {
    console.log(id, role);
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-600">👤 All Users</h2>

        {/* Filter */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="select outline-none hover:border-red-500 focus:border-red-500  select-bordered">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-red-100 text-red-700">
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status == "active" ? "badge-success" : "badge-error"
                    }`}>
                    {user.status}
                  </span>
                </td>

                {/* Three dot menu */}
                <td>
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm btn-ghost">
                      <BsThreeDotsVertical />
                    </label>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                      {user.status == "active" ? (
                        <li>
                          <button
                            onClick={() => updateStatus(user?.email, "blocked")}
                            className="text-red-600">
                            Block User
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => updateStatus(user?.email, "active")}
                            className="text-green-600">
                            Unblock User
                          </button>
                        </li>
                      )}

                      {user.role !== "volunteer" && (
                        <li>
                          <button
                            onClick={() => updateRole(user._id, "volunteer")}>
                            Make Volunteer
                          </button>
                        </li>
                      )}

                      {user.role !== "admin" && (
                        <li>
                          <button onClick={() => updateRole(user._id, "admin")}>
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
