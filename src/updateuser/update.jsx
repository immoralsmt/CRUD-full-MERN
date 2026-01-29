import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./update.css";

const UpdateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const inputhandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Load existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3004/api/users/${id}`);

        // If API returns { user: {...} } use res.data.user
        const data = res.data?.user ? res.data.user : res.data;

        setUser((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          password: "", // keep empty unless you want to show existing (usually you shouldn't)
        }));
      } catch (err) {
        console.log("GET user failed:", err?.response?.data || err.message);
      }
    };

    if (id) fetchUser();
  }, [id]);

  // ✅ Update user (NOT create)
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3004/api/update/users/${id}`,
        user
      );

      toast.success(res.data?.message || "User updated!", {
        position: "top-right",
      });

      navigate("/");
    } catch (err) {
      console.log(
        "UPDATE FAILED ❌",
        err?.response?.status,
        err?.response?.data || err.message
      );
      toast.error("Update failed", { position: "top-right" });
    }
  };

  return (
    <div className="updateuser">
      <Link to="/" className="btn btn-secondary">
        Back
      </Link>

      <h3>Update User</h3>

      <form className="updateuserform" onSubmit={submitForm}>
        <div className="updateinput">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={inputhandler}
            autoComplete="off"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="updateinput">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={inputhandler}
            autoComplete="off"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="updateinput">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={inputhandler}
            placeholder="New Password (optional)"
          />
        </div>

        <div className="updateinput">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={inputhandler}
            autoComplete="off"
            placeholder="Your Address"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
