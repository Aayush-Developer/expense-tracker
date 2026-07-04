import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast.warning("All fields are required");
            return;
        }

        if (password.length < 8) {
            toast.warning("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            toast.warning("Confirm password must match password");
            return;
        }

        try {
            const response = await api.post("/user/register", {
                name,
                email,
                password,
            });

            const { token, user } = response.data;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

            toast.success("Account created successfully!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to register"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Expense Tracker</h1>

                <p>Create your account to get started.</p>

                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                <p className="auth-footer">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;