import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './user.css'
import toast from 'react-hot-toast'

export default function User() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://localhost:3004/api/user');
                setUsers(response.data);

            } catch (err) {
                console.log("Error fetching users:", err);
            }
        };
        fetchdata();
    }, []);
    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:3004/api/delete/users/${id}`
            );

            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
            );

            toast.success(res.data.message || "User deleted", {
                position: "top-right",
            });
        } catch (err) {
            console.log(
                "Error deleting user:",
                err?.response?.status,
                err?.response?.data || err.message
            );
            toast.error("Failed to delete user", { position: "top-right" });
        }
    };
    return (
        <div className="table-wrap">
            <Link to="/add" className="btn-edit">Add User</Link>
            {users.length === 0 ? (
                <div className="no-users">
                    <h3>No Users Available</h3>
                    <p>Please Add New User</p>
                </div>
            ) : ( <table className="user-table">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className="actions">
                                <Link to={`/update/${user._id}`} className="btn btn-info">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}      
        </div>
    );
}