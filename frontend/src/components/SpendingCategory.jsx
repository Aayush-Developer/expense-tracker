import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "../styles/spendingCategory.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const SpendingCategory = ({ overview }) => {

    const expenseData =
        overview?.expenseDistribution || [];

    const data = {
        labels: expenseData.map(
            (item) => item.category
        ),

        datasets: [
            {
                data: expenseData.map(
                    (item) => item.amount
                ),

                backgroundColor: [
                    "#3B82F6",
                    "#EF4444",
                    "#22C55E",
                    "#F59E0B",
                    "#8B5CF6",
                    "#14B8A6",
                    "#EC4899",
                    "#84CC16",
                ],

                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="spending-category">

            <h2>Spending by Category</h2>

            {expenseData.length === 0 ? (

                <p>No Expense Data</p>

            ) : (

                <>

                    <div className="chart-container">

                       <Doughnut
                    data={data}
                    options={{
                    plugins: {
                     legend: {
                     display: false,
                  },
                },
                    cutout: "70%",
                    responsive: true,
                    maintainAspectRatio: false,
                    }}
                     />

                    </div>

                    <div className="category-list">

                        {expenseData.map((item) => (

                            <div
                                key={item.category}
                                className="category-item"
                            >

                                <span>
                                    {item.category}
                                </span>

                                <strong>
                                    ₹{Number(item.amount).toLocaleString("en-IN")}
                                </strong>

                            </div>

                        ))}

                    </div>

                </>

            )}

        </div>
    );
};

export default SpendingCategory;