import React from "react";
import { NavLink } from "react-router-dom";
import {
    MdDashboard,
    MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { FaMoneyBillWave, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "../styles/sidebar.css";

const Sidebar = ({ onLogout }) => {
    return (
        <aside className="sidebar">

            <nav className="sidebar-nav">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <MdDashboard />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/income"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <MdOutlineAccountBalanceWallet />
                    <span>Income</span>
                </NavLink>

                <NavLink
                    to="/expense"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <FaMoneyBillWave />
                    <span>Expense</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "nav-item active" : "nav-item"
                    }
                >
                    <FaUser />
                    <span>Profile</span>
                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={onLogout}
            >
                <FiLogOut />
                <span>Logout</span>
            </button>

        </aside>
    );
};

export default Sidebar;