import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { useEffect } from "react";
import { useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState("");
  const Navigate = usenavigate;
  const [selectedUser, setSelectedUser] = usestate("null");
  const decode = jwtDecode(localStorage.getItem("token"));
  console.log(decode);

  // if (decode.role !== "admin") {
  //   return <Navigate to={"/login"} />;
  // }

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/user`, {
      credentials: true,
      // headers: {
      //   authorization: `Bearer ${token}`,
      // },
    });
    if (!response.ok) {
      // handle error if needed
    } else {
      const data = await response.json();
      console.log(data);
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    Navigate("/");
  };

  const confirmdelete = (id) => {
    console.log(id);
    setSelectedUser(id);
    // document.getElementById("delete_confirm").showModal();
    modal.current.showModal();
  };
  const handledelete = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/user/${selectedUser}`, {
      method: "DELETE",
      credentials: "include",
      // headers: {
      //   authorization: `Bearer ${token}`,
      // },
    });
    if (!response.ok) {
    } else {
      const data = await response.json();
      console.log(data);
      fetchUser();
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button className="btn btn-square">
          Deconnexion
          <IologOut size={20} />
        </button>
      </div>
      <table className="table">
        <thead>
          <tr className="text-xl">
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.email !== localStorage.getItem("email"))
            .map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-square"
                    onClick={() => confirmDelete(user._id)}
                  ></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
