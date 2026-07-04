import { useState, useEffect } from "react";
import api from "../services/api";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";

import "../styles/financialAnalytics.css";

const FinancialAnalytics = () => {

    const [range, setRange] = useState("month");

    const [data, setData] = useState([]);

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

            setData(response.data.data.trend);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchAnalytics();

    }, [range]);

    return (

        <div className="financial-card">

            <div className="financial-header">

                <h2>Financial Analytics</h2>

                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                >

                    <option value="week">Week</option>

                    <option value="month">Month</option>

                    <option value="year">Year</option>

                </select>

            </div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="label" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line

                        type="monotone"

                        dataKey="income"

                        stroke="#22c55e"

                        strokeWidth={3}

                    />

                    <Line

                        type="monotone"

                        dataKey="expense"

                        stroke="#ef4444"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default FinancialAnalytics;