import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TopStats from "../components/TopStats";
import RecentTransactions from "../components/RecentTransactions";
import SpendingCategory from "../components/SpendingCategory";
import { Outlet } from "react-router-dom";
import api from "../services/api";
import "../styles/layout.css";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [user, setUser] = useState(null);
 const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
};
useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
        setUser(JSON.parse(savedUser));
    }
}, []);

    const [overview, setOverview] = useState(null);

    const fetchDashboard = async () => {
        try {

            const response = await api.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setOverview(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    console.log("Layout user:", user)
   return (
    <>
        <Navbar user={user} />

        <div className="dashboard-layout">

            <Sidebar  onLogout={handleLogout} />

            <main className="main-content">

                <TopStats overview={overview} />

                <div className="page-content">
                    <Outlet
                        context={{
                            overview,
                            refreshDashboard: fetchDashboard,
                        }}
                    />
                </div>

                <div className="bottom-widgets">

                    <RecentTransactions
                        transactions={overview?.recentTransactions}
                    />

                    <SpendingCategory
                        overview={overview}
                    />

                </div>

            </main>

        </div>
    </>
);
};

export default Layout;