import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { useOutletContext } from "react-router-dom";
import api from "../services/api";

import FinancialAnalytics from "../components/FinancialAnalytics";
// import AnalyticsCards from "../components/AnalyticsCards";

const Dashboard = () => {

    const [user, setUser] = useState(null);

    const [range, setRange] = useState("month");

    const [analytics, setAnalytics] = useState(null);

    const { overview } = useOutletContext();

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);

    useEffect(() => {
        fetchAnalytics();
    }, [range]);

    const fetchAnalytics = async () => {

        try {

            const response = await api.get(
                `/dashboard/analytics?range=${range}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setAnalytics(response.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="dashboard-page">

            {/* Welcome Section */}

            <div className="dashboard-welcome">

                <h1>
                    Welcome back, {user?.name || "User"} 👋
                </h1>

                <p>
                    {overview?.totalBalance > 0
                        ? `You've saved ₹${overview.totalBalance.toLocaleString("en-IN")} this month. Keep it up!`
                        : overview?.totalBalance === 0
                        ? "You're breaking even this month."
                        : `You've spent ₹${Math.abs(
                              overview?.totalBalance || 0
                          ).toLocaleString("en-IN")} more than your income this month.`}
                </p>

            </div>

            {/* Analytics */}

            <FinancialAnalytics
                analytics={analytics}
                range={range}
                setRange={setRange}
            />

            {/* Later we'll add these */}

            {/* <AnalyticsCards analytics={analytics} /> */}

        </div>

    );

};

export default Dashboard;