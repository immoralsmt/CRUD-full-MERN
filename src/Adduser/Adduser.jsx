import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./adduser.css";

const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
    });

    const navigate = useNavigate();

    const inputhandler = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("SUBMIT CLICKED", user);

        try {
            const res = await axios.post("http://localhost:3004/api/users", user);
            // console.log("POST SUCCESSFUL ✅", res.data);
            toast.success(res.data.message, {position: "top-right"});
            navigate("/");
        } catch (err) {
            console.log("POST FAILED ❌", err?.response?.status, err?.response?.data || err.message);
        }
    };
    return (
        <div className="adduser">
            <Link to="/" className="btn btn-secondary">
                Back
            </Link>

            <h3>Add New User</h3>

            <form className="adduserform" onSubmit={submitForm}>
                <div className="inputgroup">
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

                <div className="inputgroup">
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
                <div className="inputgroup">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={inputhandler}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="inputgroup">
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUser;
